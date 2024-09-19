import {md5} from 'js-md5';


function encode_password(text:string){
	const hash = md5.create();
	hash.update(text);
	return hash.hex();
}

export {encode_password};