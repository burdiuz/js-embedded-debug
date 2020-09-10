import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'edconsole.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**'
    })
  ]
};