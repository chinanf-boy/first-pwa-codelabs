polymer build
mv build/es5-bundled/* build/
rm -Rf build/es5-bundled && rm -Rf docs && mv build docs && cp -R ./mds ./docs/mds
