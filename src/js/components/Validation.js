class Validation {
    constructor(rules) {
        this.rules = rules;
    }

    validate(object) {
        let validationResult = new ValidationResult();
        for(let rule in this.rules) {
            let {field, validation, message} = this.rules[rule];
            if (!validation(object[field])) {
                validationResult.record(field, message);
            }
        }
        return validationResult;
    }
}

class ValidationResult {
    constructor() {
        this.errors = {};
    }

    record(field, message) {
        this.errors[field] = message;
    }

    has(field) {
        return this.errors.hasOwnProperty(field);
    }

    any() {
        return Object.keys(this.errors).length > 0;
    }

    get(field) {
        if (this.errors[field]) {
            return this.errors.field;
        }
    }

}

// class ValidationRule {
//     constructor({field, validation, message}) {
//         this.field = field;
//         this.validation = validation;
//         this.message = message;
//     }
// }

export { Validation, ValidationResult };