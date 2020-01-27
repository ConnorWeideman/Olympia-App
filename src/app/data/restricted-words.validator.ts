import { FormControl } from "@angular/forms";

export function restrictedWords() {
    return (control: FormControl): { [key: string]: any } => {
        const words = ["shit", "fuck", "bitch"];
        const invalidWords = words.map(w => control.value.includes(w) ? w : null).filter(w => w != null);

        return invalidWords && invalidWords.length > 0
            ? { "restrictedWords": invalidWords.join(", ") }
            : null;
    };
}
