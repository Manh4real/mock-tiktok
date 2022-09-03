import moment from "moment";
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
    validateBio: (value: string) => ValidateValue;
    validateName: (value: string) => ValidateValue;
    validatePhoto: (value: string) => ValidateValue;
    validateVideo: (value: string) => ValidateValue;
    validateCaption: (value: string) => ValidateValue;
}
export enum ValidationType {
    CODE = "code",
    EMAIL = "email",
    PASSWORD = "password",
    PHONE = "phone",
    USERNAME = "username",
    NAME = "name",
    BIRTHDAY = "birthday",
    BIO = "bio",
    PHOTO = "photo",
    VIDEO = "video",
    CAPTION = "caption"
}
export interface Birthday {
    day: string | number,
    month: string | number,
    year: string | number
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
            case ValidationType.NAME:
                return this.validateName(value);
            case ValidationType.BIRTHDAY:
                return this.validateBirthday(value);
            case ValidationType.BIO:
                return this.validateBio(value);
            case ValidationType.PHOTO:
                return this.validatePhoto(value);
            case ValidationType.VIDEO:
                return this.validateVideo(value);
            case ValidationType.CAPTION:
                return this.validateCaption(value);
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
        const check = value.length >= 2 && Patterns.username.test(value);
        const mes = value.length < 2 ? "Include at least 2 characters in your username" : "";

        return { isValid: check, errorMessage: mes };
    }
    validateBirthday(value: string): ValidateValue {
        const { day, month, year } = JSON.parse(value) as Birthday;
        const date = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");
        const check = date.isValid();

        return { isValid: check, errorMessage: "Please enter your birthday" }
    }
    validateBio(value: string): ValidateValue {
        const check = Patterns.bio.test(value);

        return { isValid: check, errorMessage: "Bio must less than 80 characters" }
    }
    validateName(value: string): ValidateValue {
        const check = Patterns.name.test(value);

        return { isValid: check, errorMessage: "Name ..." }
    }
    validatePhoto(value: string): ValidateValue {
        const ext = value.toLowerCase().split(".").slice(0).pop();
        const check = ext && ["jpeg", "jpg", "png", "gif"].includes(ext);

        return { isValid: !!check, errorMessage: "Avatar must be a file of type: jpeg, jpg, png, gif" }
    }
    validateVideo(value: string): ValidateValue {
        const ext = value.toLowerCase().split(".").slice(0).pop();
        const check = ext && ["mp4"].includes(ext);

        return { isValid: !!check, errorMessage: "Video must be a file of type: mp4" }
    }
    validateCaption(value: string): ValidateValue {
        const check = Patterns.caption.test(value);

        return { isValid: check, errorMessage: "Caption must less than 150 characters" }
    }
}

export default Validation;