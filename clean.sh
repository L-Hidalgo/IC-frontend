#!/bin/sh

echo "Actualizando Core-Lib..."
echo "Eliminando archivos cache..."
rm -rf node_modules/core-lib/
rm -rf package-lock.json
rm -rf .angular/
echo "Clean cache..."
npm cache clean --force
echo "npm install ..."
npm install --force