interface PatternObject {
    code: RegExp;
    email: RegExp;
    password: RegExp;
    phone: RegExp;
    username: RegExp;
    name: RegExp;
    bio: RegExp;
    caption: RegExp;
}

const Patterns: PatternObject = {
    code: /^\d{6}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^\S{1,20}$/,
    phone: /^\d{10,15}$/,
    username: /^[A-Za-z0-9_,]{2,}$/,
    name: /./,
    bio: /^[^]{0,80}$/u,
    caption: /^[^]{1,150}$/u,
}

export default Patterns;