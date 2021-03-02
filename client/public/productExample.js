const toolTemplate = (
  values,
  isViewer = false,
) => {
  return `
    <div class="product-card">
      <img src="${values.productImage.url}" />
      <div class="product-card-body">
        ${values.productProperties.allowedValues.name ? `
          <h3 class="m-0">${values.productName}</h3>
        ` : ''}
        ${values.productProperties.allowedValues.number ? `
          <div class="description">${values.productNumber}</div>
        ` : ''}
        ${values.productProperties.allowedValues.sku ? `
          <div class="description">${values.productSku}</div>
        ` : ''}
      </div>
    </div>
    ${isViewer ? modalTemplate({ products: values.data.products }) : ''}
  `;
};

const modalTemplate = data => {
  return `
    <div class="modal" id="product_library_modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Products Library</h3>
            <button class="close" onclick="hideModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="products-list">
              ${productItemsTemplate(data)}
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  `;
};

const productItemsTemplate = _.template(`
  <% _.forEach(products, function(item) { %>
    <div class="product-item" id="product-item" data-uuid='<%= item.id %>' data-title="<%= item.name %>" data-image="<%= item.image %>" >
    <img src="<%= item.image %>" style="max-height: 300px;min-height: 300px;width: 100%;" />
      <h4 style="margin: 0.5rem 0; text-align: left;"><%= item.name %></h4>
    </div>
  <% }); %>
`);

const editorTemplate = `
  <fieldset>
    <legend>Add Product from Library</legend>
    <button id="addProduct" class="button">Add Product</button>
  </fieldset>
`;

const propertiesTemplate = `
  <div class="product-properties">
    <form id="properties-form">
      <fieldset>
        <legend>Available Product Properties</legend>
        <input type="checkbox" name="Name" value="name" class="properties-item"><span>Name</span><br>
        <input type="checkbox" name="Number" value="number" class="properties-item"><span>Number</span><br>
        <input type="checkbox" name="SKU" value="sku" class="properties-item"><span>SKU</span><br>
        <br>
      </fieldset>      
    </form>
  </div>
`;

const showModal = () => {
  const modal = document.getElementById('product_library_modal');
  modal.classList.add('show');
};

const hideModal = () => {
  const modal = document.getElementById('product_library_modal');
  modal.classList.remove('show');
};

unlayer.registerTool({
  name: 'product_tool',
  label: 'Product',
  icon: 'fa-tag',
  supportedDisplayModes: ['web', 'email'],
  options: {
    productContent: {
      title: 'Product Content',
      position: 1,
      options: {
        productLibrary: {
          label: 'Add Product from store',
          defaultValue: '',
          widget: 'product_library',
        },
        productProperties: {
          label: 'Edit Product properties',
          defaultValue: {
            allowedValues: { name: true, number: false }
          },
          widget: 'product_properties',
        },
        productImage: {
          label: 'Product Image',
          defaultValue: {
            url: 'https://via.placeholder.com/315x375',
          },
          widget: 'image',
        },
        productName: {
          label: 'Product Name',
          defaultValue: 'Product Name',
          widget: 'text',
        },
        productNumber: {
          label: 'Product Number',
          defaultValue: 'Product Number',
          widget: 'text',
        },
        productSku: {
          label: 'Product SKU',
          defaultValue: 'Product SKU',
          widget: 'text',
        },
      },
    },
  },
  transformer: (values, source) => {
    const { name, value, data } = source;
    // Transform the values here
    // We will update selected values in property editor here
    let newValues = { ...values };
    if (name === 'productLibrary') {
      newValues = {
        ...values,
        productName: value.selected.name,
        productNumber: value.selected.number,
        productSku: value.selected.sku,
        productImage: {
          url: value.selected.image,
        },
      }
    }
    if (name === 'productProperties') {
      newValues = {
        ...values,
        allowedValues: value.productProperties,
      }
    }

    // Return updated values
    return newValues;
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return toolTemplate(values, true);
      },
    }),
    exporters: {
      web: function (values) {
        return toolTemplate(values);
      },
      email: function (values) {
        return toolTemplate(values);
      },
    },
    head: {
      // As we need custom styling in export as well that's why we put those styles here
      css: function (values) {
        return `      
        .product-card {
          position: relative;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          min-width: 0;
          word-wrap: break-word;
          background-color: #fff;
          background-clip: border-box;
          border: 1px solid rgba(0,0,0,.125);
          border-radius: .25rem;
          margin: auto;
          text-align: center;
        }

        .product-card-body {
          padding: 0 1rem 1rem;
          text-align: left;
        }

        .product-card-body h3 {
          margin: 0.7rem 0;
        }

        .product-card img {
          width: 100%;
          object-fit: contain;
          border-top-left-radius: 0.25rem;
          border-top-right-radius: 0.25rem;
        }

        .button {
          display: inline-block;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          vertical-align: middle;
          background-color: transparent;
          border: 1px solid transparent;
          border-radius: 0.25rem;
          padding: .75rem;
          font-size: 1rem;
          line-height: 1.5;
          transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
          background-color: rgb(0, 123, 255);
          cursor: pointer;
        }

        .m-0 {
          margin: 0px;
        }

        .no-underline {
          text-decoration: none;
        }

        .no-border-radius {
          border-radius: 0px;
        }
        `;
      },
      js: function (values) {},
    },
  },
});

unlayer.registerPropertyEditor({
  name: 'product_library',
  layout: 'bottom',
  Widget: unlayer.createWidget({
    render(value, updateValue, data) {
      return editorTemplate;
    },
    mount(node, value, updateValue, data) {
      var addButton = node.querySelector('#addProduct');
      addButton.onclick = function () {
        showModal();
        setTimeout(() => {
          // We are using event bubling to capture clicked item instead of registering click event on all product items.
          var selectButton = document.querySelector('.products-list');
          if (!selectButton) return;
          selectButton.onclick = function (e) {
            if (e.target.id === 'product-item') {
              // If user clicks on product item
              // Find selected item from products list
              const selectedProduct = data.products.find(
                (item) => item.id === parseInt(e.target.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            } else {
              // If user click on child of product item (e.g. title, price, image or desctiption)
              const parent = e.target.parentElement;
              if (parent && parent.id !== 'product-item') return;
              const selectedProduct = data.products.find(
                (item) =>
                  item.id === parent.dataset.uuid
                  || item.id === parseInt(parent.dataset.uuid)
              );
              updateValue({ selected: selectedProduct });
            }
            hideModal();
            // This is a hack to close property editor right bar on selecting an item from products list.
            var outerBody = document.querySelector('#u_body');
            outerBody.click();
          };
        }, 200);
      };
    },
  }),
});

unlayer.registerPropertyEditor({
  name: 'product_properties',
  layout: 'bottom',
  Widget: unlayer.createWidget({
    render(value, updateValue, data) {
      return propertiesTemplate;
    },
    mount(node, { allowedValues }, updateValue, data) {
      // check checkboxes based on defaultValues
      const preCheckedValsArr = Object.entries(allowedValues)
        .filter(([,v]) => v)
        .map(([k,]) => k);
      node.querySelectorAll('input').forEach(input => {
        if (preCheckedValsArr.indexOf(input.value) >= 0) input.checked = true;
      })

      // handle clicking on checkboxes and updating the values
      const form = node.querySelector('#properties-form');
      form.onclick = e => {
        const checked = form.querySelectorAll('input:checked');
        const checkedValues = Array.from(checked)
          .filter(input => input.value)
          .map(input => input.value)
        const checkedValuesObj = {
          name: checkedValues.indexOf('name') >= 0 ? true : false,
          number: checkedValues.indexOf('number') >= 0 ? true : false,
          sku: checkedValues.indexOf('sku') >= 0 ? true : false,
        };
        updateValue({ allowedValues: checkedValuesObj });
      }
    },
  }),
});

