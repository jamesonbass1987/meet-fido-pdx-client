const isUrl = require('is-url');

export const updateObject = (oldObject, updatedProperties) => ({
    ...oldObject,
    ...updatedProperties
});

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    };

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    };

    if (rules.requiredDropdown) {
        isValid = value !== '' && isValid;
    };

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    };

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    };

    if (rules.isEmail) {
        const pattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        isValid = pattern.test(value) && isValid;
    };

    if (rules.requiredURL) {
        let urlVal;
        urlVal = value.includes('http') ? value : 'http://' + value;
        isValid = isUrl(urlVal) && isValid;
    };

    return isValid;
};

export const mapDropdownItems = items => (
    items.map((item, i) => ({
            text: item.name,
            value: item.id,
            key: i + item.name
        })
    )
);
