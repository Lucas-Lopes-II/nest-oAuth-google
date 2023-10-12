export type ProfileOAuthGoogle = {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  emails: { value: string; verified: boolean }[];
  photos: {
    value: string;
  }[];
  provider: string;
  _raw: string;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
    hd: string;
  };
};

/*** EXEMPLO ***/
// {
//   id: '101039966989477549289',
//   displayName: 'Fulno da Silva Santos',
//   name: { familyName: 'da Silva Santos', givenName: 'Fulno ' },
//   emails: [ { value: 'FulanoSantos@gmail.com', verified: true } ],
//   photos: [
//     {
//       value: 'https://lh3.googleusercontent.com/a/ACg8ocLWX39ZAafislEl3vB5Ak9aiUNm8d0QycRgejzoe4IHvQ=s96-c'
//     }
//   ],
//   provider: 'google',
//   _raw: '{\n' +
//     '  "sub": "101039966989477549289",\n' +
//     '  "name": "Fulno da Silva Santos",\n' +
//     '  "given_name": "Fulno ",\n' +
//     '  "family_name": "da Silva Santos",\n' +
//     '  "picture": "https://lh3.googleusercontent.com/a/ACg8ocLWX39ZAafislEl3vB5Ak9aiUNm8d0QycRgejzoe4IHvQ\\u003ds96-c",\n' +
//     '  "email": "FulanoSantos@gmail.com",\n' +
//     '  "email_verified": true,\n' +
//     '  "locale": "pt-BR",\n' +
//     '  "hd": "gmail.com"\n' +
//     '}',
//   _json: {
//     sub: '101039966989477549289',
//     name: 'Fulno da Silva Santos',
//     given_name: 'Fulno ',
//     family_name: 'da Silva Santos',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocLWX39ZAafislEl3vB5Ak9aiUNm8d0QycRgejzoe4IHvQ=s96-c',
//     email: 'FulanoSantos@gmail.com',
//     email_verified: true,
//     locale: 'pt-BR',
//     hd: 'gmail.com'
//   }
// }
