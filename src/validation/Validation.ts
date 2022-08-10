import Patterns from "./Patterns";

export interface ValidateValue {
    isValid: boolean,
    errorMessage: string
}
interface ValidationClass {
    validate: (validationType: ValidationType, value: string) => ValidateValue;
    validateCode: (value: string) => ValidateValue;
    validateEmail: (value: string) => ValidateValue;
    validatePassword: (value: string) => ValidateValue;
    validatePhone: (value: string) => ValidateValue;
    validateUsername: (value: string) => ValidateValue;
}
export enum ValidationType {
    CODE = "code",
    EMAIL = "email",
    PASSWORD = "password",
    PHONE = "phone",
    USERNAME = "username",
}

class Validation implements ValidationClass {
    validate(validationType: ValidationType, value: string): ValidateValue {
        value = value.trim();

        switch (validationType) {
            case ValidationType.CODE:
                return this.validateCode(value);
            case ValidationType.EMAIL:
                return this.validateEmail(value);
            case ValidationType.PASSWORD:
                return this.validatePassword(value);
            case ValidationType.PHONE:
                return this.validatePhone(value);
            case ValidationType.USERNAME:
                return this.validateUsername(value);
        }
    }
    validateCode(value: string): ValidateValue {
        const check = Patterns.code.test(value);
        return { isValid: check, errorMessage: "Enter 6-digit code" };
    }
    validateEmail(value: string): ValidateValue {
        const check = Patterns.email.test(value);
        return { isValid: check, errorMessage: "Enter a valid email address" };
    }
    validatePassword(value: string): ValidateValue {
        const check = Patterns.password.test(value);
        return { isValid: check, errorMessage: "8 to 20 characters. \nLetters, numbers, and special characters." };
    }
    validatePhone(value: string): ValidateValue {
        const check = Patterns.phone.test(value);
        return { isValid: check, errorMessage: "Enter a valid phone number" };
    }
    validateUsername(value: string): ValidateValue {
        const check = Patterns.username.test(value);
        return { isValid: check, errorMessage: "" };
    }
}

export default Validation;