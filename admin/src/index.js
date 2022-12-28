import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginId from "./pluginId";
import MultiSelectIcon from "./components/MultiSelectIcon";
import getTrad from "./utils/getTrad";

export default {
  register(app) {
    app.customFields.register([
      {
        name: "multi-select",
        pluginId: "multi-select",
        type: "json",
        icon: MultiSelectIcon,
        intlLabel: {
          id: getTrad("multi-select.label"),
          defaultMessage: "Multi Select",
        },
        intlDescription: {
          id: getTrad("multi-select.description"),
          defaultMessage: "Select multiple options from a list",
        },
        components: {
          Input: async () => import("./components/MultiSelect"),
        },
        options: {
          base: [
            {
              sectionTitle: null,
              items: [
                {
                  name: "options",
                  type: "textarea-enum",
                  intlLabel: {
                    id: getTrad("select.enum.label"),
                    defaultMessage: "Options (one per line)",
                  },
                  description: {
                    id: getTrad("select.enum.description"),
                    defaultMessage:
                      'Enter one option per line. You can also add a value and a label separated by a colon (e.g. "label:value").\nIf no value is provided, the label will be used as the value.',
                  },
                  placeholder: {
                    id: getTrad("select.enum.placeholder"),
                    defaultMessage:
                      "Ex:\nOption 1\nOption 2\nOption 3:option-3",
                  },
                },
              ],
            },
          ],
          advanced: [
            {
              sectionTitle: {
                id: "global.settings",
                defaultMessage: "Settings",
              },
              items: [
                {
                  name: "required",
                  type: "checkbox",
                  intlLabel: {
                    id: "form.attribute.item.requiredField",
                    defaultMessage: "Required field",
                  },
                  description: {
                    id: "form.attribute.item.requiredField.description",
                    defaultMessage:
                      "You won't be able to create an entry if this field is empty",
                  },
                },
              ],
            },
          ],
        },
      },
      {
        name: "single-select",
        pluginId: "multi-select",
        type: "string",
        icon: MultiSelectIcon,
        intlLabel: {
          id: getTrad("single-select.label"),
          defaultMessage: "Single Select",
        },
        intlDescription: {
          id: getTrad("single-select.description"),
          defaultMessage: "Select a single options from a list",
        },
        components: {
          Input: async () => import("./components/SingleSelect"),
        },
        options: {
          base: [
            {
              sectionTitle: null,
              items: [
                {
                  name: "options",
                  type: "textarea-enum",
                  intlLabel: {
                    id: getTrad("select.enum.label"),
                    defaultMessage: "Options (one per line)",
                  },
                  description: {
                    id: getTrad("select.enum.description"),
                    defaultMessage:
                      'Enter one option per line. You can also add a value and a label separated by a colon (e.g. "label:value").\nIf no value is provided, the label will be used as the value.',
                  },
                  placeholder: {
                    id: getTrad("select.enum.placeholder"),
                    defaultMessage:
                      "Ex:\nOption 1\nOption 2\nOption 3:option-3",
                  },
                },
              ],
            },
          ],
          advanced: [
            {
              sectionTitle: {
                id: "global.settings",
                defaultMessage: "Settings",
              },
              items: [
                {
                  name: "required",
                  type: "checkbox",
                  intlLabel: {
                    id: "form.attribute.item.requiredField",
                    defaultMessage: "Required field",
                  },
                  description: {
                    id: "form.attribute.item.requiredField.description",
                    defaultMessage:
                      "You won't be able to create an entry if this field is empty",
                  },
                },
              ],
            },
          ],
        },
      },
    ]);
  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return Promise.all([import(`./translations/${locale}.json`)])
          .then(([pluginTranslations]) => {
            return {
              data: {
                ...prefixPluginTranslations(
                  pluginTranslations.default,
                  pluginId
                ),
              },
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );
    return Promise.resolve(importedTrads);
  },
};
