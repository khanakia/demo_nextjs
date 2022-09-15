export default function capitalize(word: string){
	if(!word) return '';
	return word[0].toUpperCase()+word.slice(1).toLowerCase();
}