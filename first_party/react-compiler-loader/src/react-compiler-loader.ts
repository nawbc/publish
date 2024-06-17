import babel from '@babel/core';
import BabelPluginReactCompiler from 'babel-plugin-react-compiler';
import type webpack from 'webpack';

export const reactCompilerLoader = async function (
  this: webpack.LoaderContext<any>,
  content: string,
) {
  const callback = this.async();

  try {
    const reactCompilerConfig = this.getOptions();

    const result = await babel.transformAsync(content, {
      plugins: [[BabelPluginReactCompiler, reactCompilerConfig]],
    });

    if (!result) {
      callback(new TypeError(`Babel failed to transform ${this.resourcePath}`));
      return;
    }

    const { code, map } = result;
    callback(null, code ?? undefined, map ?? undefined);
  } catch (e) {
    callback(e);
  }
};
