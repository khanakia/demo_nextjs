export default function metaDescr(word: string){
	if(!word) return '';
	let text = word.replace(/(\r\n|\n|\r)/gm,"").trim().substring(0, 200);
	return text
}