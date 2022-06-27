/**
 * This plugin is to fix the error when compiling antd.
 * less function will throw an error when we pass a css variable to it.
 */
const functions: Record<string, (color: string) => string> = {
  fadeout: (color) => color,
};

class FunctionOverridePlugin {
  install(less: any) {
    less.functions.functionRegistry.addMultiple(functions);
  }
}

export default FunctionOverridePlugin;
