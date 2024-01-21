/** @type {import('stylelint').Config} */
module.exports = {
  plugins: ["stylelint-order"],
  extends: ["stylelint-config-standard", "stylelint-config-rational-order"],
  customSyntax: require("@linaria/postcss-linaria"),
  rules: {
    "font-family-no-missing-generic-family-keyword": null,
    "property-no-vendor-prefix": true,
    "string-no-newline": true,
    "value-no-vendor-prefix": true,
    "no-empty-source": null,
    // /* pcss-lin */ placeholder comments are added during parsing
    "comment-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["stylelint-commands"],
        ignoreComments: [/pcss-lin/],
      },
    ],
    //  '//' comments create unknown word issues while linting. Force using /* */
    "no-invalid-double-slash-comments": true,
  },
};
