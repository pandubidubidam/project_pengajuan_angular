import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [],
  providers: [],
})
export class GlobalHelper {

    toBase64(file: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
            const base64Data = reader.result?.toString()?.split(',')[1];
            resolve(base64Data || '');
            };
            reader.onerror = error => reject(error);
        });
    }

    isEmptyObject(obj: Object){
        return JSON.stringify(obj) === '{}'
    }
}
