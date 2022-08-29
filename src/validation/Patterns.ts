interface PatternObject {
    code: RegExp;
    email: RegExp;
    password: RegExp;
    phone: RegExp;
    username: RegExp;
}

const Patterns: PatternObject = {
    code: /^\d{6}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^\S{1,20}$/,
    phone: /^\d{10,15}$/,
    username: /./,
}

export default Patterns;