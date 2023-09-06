import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';

function bundle(filename, options = {}) {
  return {
    input: 'src/index.ts',
    output: {
      file: filename,
      format: 'umd',
      name: 'BasemapControl',
      sourcemap: true
    },
    external: [
      // ...Object.keys(pkg.peerDependencies),
      'fs',
      'path',
    ],
    plugins: [
      resolve(),
      typescript(
        {
          tsconfig: 'tsconfig.json',
          declaration: true,
          declarationDir: 'dist',
        }
      ),
      babel({ babelHelpers: 'runtime' }),
      options.minimize ? terser() : false,
      options.stats ? visualizer({
        filename: filename + '.stats.html',
      }) : false,
    ],
  };
}

export default [
  bundle(pkg.browser.replace('.min', ''), { stats: true }),
  bundle(pkg.browser, { minimize: true }),
];
