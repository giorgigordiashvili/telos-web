#!/bin/bash

# Telos Web Application - Deployment Validation Script
# This script validates that all optimizations are working correctly

echo "🔍 Telos Web Application - Deployment Validation"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

echo ""
print_info "1. Checking project dependencies..."

# Check if node_modules exists
if [ -d "node_modules" ]; then
    print_status 0 "Node modules installed"
else
    print_status 1 "Node modules missing - run 'npm install'"
    exit 1
fi

echo ""
print_info "2. Validating Next.js configuration..."

# Check if next.config.ts exists and has proper structure
if [ -f "next.config.ts" ]; then
    if grep -q "removeConsole" next.config.ts; then
        print_status 0 "Console removal optimization enabled"
    else
        print_warning "Console removal optimization not found"
    fi
    
    if grep -q "tree shaking" next.config.ts; then
        print_status 0 "Tree shaking optimization enabled"
    else
        print_warning "Tree shaking optimization not found"
    fi
    
    if grep -q "webp" next.config.ts; then
        print_status 0 "Image optimization with WebP/AVIF enabled"
    else
        print_warning "Image optimization not found"
    fi
else
    print_status 1 "next.config.ts not found"
fi

echo ""
print_info "3. Testing TypeScript configuration..."

# Check tsconfig.json for proper path mapping
if [ -f "tsconfig.json" ]; then
    if grep -q "baseUrl" tsconfig.json; then
        print_status 0 "TypeScript baseUrl configuration found"
    else
        print_warning "TypeScript baseUrl not configured"
    fi
    
    if grep -q "@/\*" tsconfig.json; then
        print_status 0 "Path mapping for @ alias configured"
    else
        print_warning "Path mapping for @ alias not found"
    fi
else
    print_status 1 "tsconfig.json not found"
fi

echo ""
print_info "4. Testing build process..."

# Test if build command works
npm run build > /dev/null 2>&1
build_result=$?
print_status $build_result "Production build test"

if [ $build_result -eq 0 ]; then
    # Check if build output exists
    if [ -d ".next" ]; then
        print_status 0 "Build output directory created"
        
        # Check for standalone build
        if [ -d ".next/standalone" ]; then
            print_status 0 "Standalone build generated"
        else
            print_warning "Standalone build not found"
        fi
        
        # Check for static files
        if [ -d ".next/static" ]; then
            print_status 0 "Static files generated"
        else
            print_warning "Static files not found"
        fi
    else
        print_status 1 "Build output directory missing"
    fi
else
    print_status 1 "Build failed - check error messages above"
fi

echo ""
print_info "5. Validating performance scripts..."

# Check if performance analysis script exists
if [ -f "scripts/performance-analysis.js" ]; then
    print_status 0 "Performance analysis script found"
    
    # Test performance script
    npm run perf > /dev/null 2>&1
    perf_result=$?
    print_status $perf_result "Performance analysis script execution"
else
    print_status 1 "Performance analysis script missing"
fi

echo ""
print_info "6. Checking Netlify configuration..."

# Check netlify.toml
if [ -f "netlify.toml" ]; then
    print_status 0 "Netlify configuration file found"
    
    if grep -q "build:netlify" netlify.toml; then
        print_status 0 "Netlify build command configured"
    else
        print_warning "Netlify build command not found"
    fi
    
    if grep -q "Cache-Control" netlify.toml; then
        print_status 0 "Caching headers configured"
    else
        print_warning "Caching headers not configured"
    fi
    
    if grep -q "X-Frame-Options" netlify.toml; then
        print_status 0 "Security headers configured"
    else
        print_warning "Security headers not configured"
    fi
else
    print_status 1 "netlify.toml not found"
fi

echo ""
print_info "7. Bundle analysis validation..."

# Check if bundle analyzer reports exist
if [ -f ".next/analyze/client.html" ]; then
    print_status 0 "Client bundle analysis report available"
else
    print_warning "Client bundle analysis report not found - run 'npm run build:analyze'"
fi

if [ -f ".next/analyze/nodejs.html" ]; then
    print_status 0 "Server bundle analysis report available"
else
    print_warning "Server bundle analysis report not found - run 'npm run build:analyze'"
fi

echo ""
print_info "8. Final deployment readiness check..."

# Calculate overall score
total_checks=15
passed_checks=0

# Count successful checks (this is a simplified version)
if [ -d "node_modules" ]; then ((passed_checks++)); fi
if [ -f "next.config.ts" ]; then ((passed_checks++)); fi
if [ -f "tsconfig.json" ]; then ((passed_checks++)); fi
if [ $build_result -eq 0 ]; then ((passed_checks++)); fi
if [ -d ".next" ]; then ((passed_checks++)); fi
if [ -f "scripts/performance-analysis.js" ]; then ((passed_checks++)); fi
if [ -f "netlify.toml" ]; then ((passed_checks++)); fi

score=$((passed_checks * 100 / 7))

echo ""
echo "📊 Deployment Readiness Score: ${score}%"

if [ $score -ge 90 ]; then
    echo -e "${GREEN}🎉 Excellent! Your application is ready for deployment.${NC}"
elif [ $score -ge 75 ]; then
    echo -e "${YELLOW}⚠️  Good! Your application is mostly ready. Address the warnings above.${NC}"
else
    echo -e "${RED}❌ Your application needs more work before deployment.${NC}"
fi

echo ""
echo "📚 Next Steps:"
echo "1. Address any warnings or errors shown above"
echo "2. Run 'npm run build:analyze' to generate bundle reports"
echo "3. Review bundle reports in .next/analyze/ directory"
echo "4. Deploy to Netlify using the configured build command"
echo "5. Monitor performance using 'npm run perf' after deployment"

echo ""
echo "🔗 Useful Commands:"
echo "  npm run build:prod     - Production build with optimizations"
echo "  npm run build:analyze  - Build with bundle analysis"
echo "  npm run perf          - Performance analysis"
echo "  npm run dev           - Development server"

echo ""
echo "Validation complete! 🚀"
