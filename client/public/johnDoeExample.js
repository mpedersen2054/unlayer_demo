
// John Doe example

unlayer.registerTool({
  name: 'john_doe_example',
  label: 'My Tool',
  icon: 'fa-smile',
  supportedDisplayModes: ['web', 'email'],
  options: {
    occupation: {
      title: 'Occupation',
      position: 1,
      options: {
        occupation: {
          label: 'Occupation',
          defaultValue: 'Software Engineer',
          widget: 'dropdown',
        },
      },
    },
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return `<div>
          <img src="${values.data.photo}" />
          <div>My name is <strong>${values.data.name}</strong> and I am <strong>${values.data.age}</strong> years old.</div>
          <div>My occupation is <strong>${values.occupation}</strong>.</div>
        </div>`;
      },
    }),
    exporters: {
      web: function (values) {
        return `<div>
          <img src="${values.data.photo}" />
          <div>My name is <strong>${values.data.name}</strong> and I am <strong>${values.data.age}</strong> years old.</div>
          <div>My occupation is <strong>${values.occupation}</strong>.</div>
        </div>`;
      },
      email: function (values) {
        return `<div>
          <img src="${values.data.photo}" />
          <div>My name is <strong>${values.data.name}</strong> and I am <strong>${values.data.age}</strong> years old.</div>
          <div>My occupation is <strong>${values.occupation}</strong>.</div>
        </div>`;
      },
    },
    head: {
      css: function (values) {},
      js: function (values) {},
    },
  },
});