import { get } from "lodash";

export const formikUtil = (formik) => {
  return {
    removeAtIndex: (path, index) => {
      const list = get(formik.values, path);
      formik.setFieldValue(
        path,
        list.filter((_, i) => i !== index)
      );
    },
    add: (path, value) => {
      formik.setFieldValue(path, [...formik.values.releaseInfo?.artistes, value]);
    },
  };
};
