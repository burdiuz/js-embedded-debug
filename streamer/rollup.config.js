import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'edconsole.js',
      format: 'umd',
    },
    plugins: [
      resolve(),
      commonjs({
        include: 'node_modules/**',
      }),
    ],
  },
  {
    input: 'src/bundle.js',
    output: [{ file: 'edconsole-bundle.js', format: 'umd' }],
    plugins: [
      resolve(),
      commonjs({
        include: 'node_modules/**',
      }),
    ],
  },
  {
    input: 'src/bundle.js',
    output: [{ file: 'edconsole-bundle.legacy.js', format: 'umd' }],
    plugins: [
      resolve(),
      commonjs({
        include: 'node_modules/**',
      }),
      babel({ babelHelpers: 'bundled' }),
    ],
  },
];
