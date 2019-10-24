export const basicComponents = [
  {
    type: 'input',
    name: '单行文本',
    icon: 'regular/keyboard',
    hidden: false,
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,

      dataType: 'string',
      pattern: '',
      placeholder: '',
    },
  },
  {
    type: 'text',
    name: '文本',
    icon: 'language',
  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: 'regular/keyboard',
    hidden: false,
    options: {
      width: '100%',
      defaultValue: '',
      disabled: false,

      required: false,
      pattern: '',
      placeholder: '',
    },
  },
  {
    type: 'number',
    name: '计数器',
    icon: 'sort-numeric-up',
    hidden: false,
    options: {
      width: '100%',
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: '',
    },
  },
  {
    type: 'radio',
    name: '单选框组',
    icon: 'regular/dot-circle',
    hidden: false,
    options: {
      disabled: false,
      inline: false,
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: '选项1',
          label: '选项1',
        },
        {
          value: '选项2',
          label: '选项2',
        },
      ],
      required: false,
      width: '100%',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
      },
      remoteFunc: '',
    },
  },
  {
    type: 'checkbox',
    name: '多选框组',
    icon: 'regular/check-square',
    hidden: false,
    options: {
      inline: false,
      defaultValue: [],
      disabled: false,

      showLabel: false,
      options: [
        {
          value: '选项1',
        },
        {
          value: '选项2',
        },
      ],
      required: false,
      width: '100%',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
      },
      remoteFunc: '',
    },
  },
  {
    type: 'time',
    name: '时间选择器',
    icon: 'regular/clock',
    hidden: false,
    options: {
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: '100%',
    },
  },
  {
    type: 'date',
    name: '日期选择器',
    icon: 'regular/calendar-alt',
    hidden: false,
    options: {
      defaultValue: false,
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: '100%',
    },
  },
  {
    type: 'rate',
    name: '评分',
    icon: 'regular/star',
    hidden: false,
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false,
    },
  },
  {
    type: 'color',
    name: '颜色选择器',
    icon: 'palette',
    hidden: false,
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false,
    },
  },
  {
    type: 'select',
    name: '下拉选择框',
    icon: 'regular/caret-square-down',
    hidden: false,
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      width: '100%',
      options: [
        {
          value: '下拉框1',
        },
        {
          value: '下拉框2',
        },
      ],
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
      },
      remoteFunc: '',
      dictID: '',
    },
  },
  {
    type: 'switch',
    name: '开关',
    icon: 'toggle-off',
    hidden: false,
    options: {
      defaultValue: false,
      required: false,
      disabled: false,
    },
  },
  {
    type: 'slider',
    name: '滑块',
    icon: 'sliders-h',
    hidden: false,
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: '100%',
    },
  },
  {
    type: 'cascader',
    name: '级联选择器',
    icon: 'regular/caret-square-down',
    hidden: false,
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      clearable: false,
      multiple: false,
      remote: 'dict',
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children',
      },
      remoteFunc: '',
    },
  },
];

export const advanceComponents = [

  {
    type: 'upload',
    name: '文件上传',
    icon: 'upload',
    hidden: false,
    options: {
      uploadParams: {
        Param: {
          MasterID: '',
          Type: '',
        },
      },
      readonly: false,
    },
  },

  {
    type: 'richtext',
    name: '富文本',
    icon: 'text-height',
    hidden: false,
    options: {
      defaultValue: '',
      readonly: false,

    },
  },
];

export const layoutComponents = [
  {
    type: 'grid',
    name: '栅格布局',
    icon: 'th',
    columns: [
      {
        span: 12,
        list: [],
      },
      {
        span: 12,
        list: [],
      },
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top',
    },
  },
];
