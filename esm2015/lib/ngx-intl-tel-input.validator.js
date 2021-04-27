import * as lpn from 'google-libphonenumber';
import { CountryCode } from './data/country-code';
/*
We use "control: any" instead of "control: FormControl" to silence:
"Property 'nativeElement' does not exist on type 'FormControl'".
This happens because I've expanded control with nativeElement via
'NativeElementInjectorDirective' to get an access to the element.
More about this approach and reasons for this:
https://github.com/angular/angular/issues/18025
https://stackoverflow.com/a/54075119/1617590
*/
export const phoneNumberValidator = (control) => {
    if (!control.value) {
        return;
    }
    // Find <input> inside injected nativeElement and get its "id".
    const el = control.nativeElement;
    // const countryCode = el?.getAttribute('ng-reflect-selected-country-i-s-o');
    const dialCode = control.value.split(' ')[0].substring(1);
    const allCountry = new CountryCode().allCountries;
    const countryCode = allCountry.filter((code) => code[2] === dialCode)[0][1];
    const inputBox = el
        ? el.querySelector('input[type="tel"]')
        : undefined;
    if (inputBox) {
        const id = inputBox.id;
        const isCheckValidation = inputBox.getAttribute('validation');
        if (isCheckValidation === 'true') {
            const isRequired = control.errors && control.errors.required === true;
            const error = { validatePhoneNumber: { valid: false } };
            inputBox.setCustomValidity('Invalid field.');
            let number;
            try {
                number = lpn.PhoneNumberUtil.getInstance().parse(control.value, countryCode);
            }
            catch (e) {
                if (isRequired === true) {
                    return error;
                }
                else {
                    inputBox.setCustomValidity('');
                }
            }
            if (control.value) {
                if (!number) {
                    return error;
                }
                else {
                    if (!lpn.PhoneNumberUtil.getInstance().isValidNumberForRegion(number, countryCode)) {
                        return error;
                    }
                    else {
                        inputBox.setCustomValidity('');
                    }
                }
            }
        }
        else if (isCheckValidation === 'false') {
            inputBox.setCustomValidity('');
            control.clearValidators();
        }
    }
    return;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1pbnRsLXRlbC1pbnB1dC9zcmMvbGliL25neC1pbnRsLXRlbC1pbnB1dC52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEdBQUcsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbEQ7Ozs7Ozs7O0VBUUU7QUFDRixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLE9BQVksRUFBRSxFQUFFO0lBR3BELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1FBQ25CLE9BQU87S0FDUDtJQUNELCtEQUErRDtJQUMvRCxNQUFNLEVBQUUsR0FBZ0IsT0FBTyxDQUFDLGFBQTRCLENBQUM7SUFFN0QsNkVBQTZFO0lBQzdFLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUxRCxNQUFNLFVBQVUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQTtJQUNqRCxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFM0UsTUFBTSxRQUFRLEdBQXFCLEVBQUU7UUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7UUFDdkMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNiLElBQUksUUFBUSxFQUFFO1FBQ2IsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUN2QixNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUQsSUFBSSxpQkFBaUIsS0FBSyxNQUFNLEVBQUU7WUFDakMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUM7WUFDdEUsTUFBTSxLQUFLLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBRXhELFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTdDLElBQUksTUFBdUIsQ0FBQztZQUU1QixJQUFJO2dCQUNILE1BQU0sR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FDL0MsT0FBTyxDQUFDLEtBQUssRUFDYixXQUFXLENBQ1gsQ0FBQzthQUNGO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1gsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO29CQUN4QixPQUFPLEtBQUssQ0FBQztpQkFDYjtxQkFBTTtvQkFDTixRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQy9CO2FBQ0Q7WUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1osT0FBTyxLQUFLLENBQUM7aUJBQ2I7cUJBQU07b0JBQ04sSUFDQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsc0JBQXNCLENBQ3hELE1BQU0sRUFDTixXQUFXLENBQ1gsRUFDQTt3QkFDRCxPQUFPLEtBQUssQ0FBQztxQkFDYjt5QkFBTTt3QkFDTixRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQy9CO2lCQUNEO2FBQ0Q7U0FDRDthQUFNLElBQUksaUJBQWlCLEtBQUssT0FBTyxFQUFFO1lBQ3pDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUUvQixPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7S0FDRDtJQUNELE9BQU87QUFDUixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBscG4gZnJvbSAnZ29vZ2xlLWxpYnBob25lbnVtYmVyJztcclxuaW1wb3J0IHsgQ291bnRyeUNvZGUgfSBmcm9tICcuL2RhdGEvY291bnRyeS1jb2RlJztcclxuXHJcbi8qXHJcbldlIHVzZSBcImNvbnRyb2w6IGFueVwiIGluc3RlYWQgb2YgXCJjb250cm9sOiBGb3JtQ29udHJvbFwiIHRvIHNpbGVuY2U6XHJcblwiUHJvcGVydHkgJ25hdGl2ZUVsZW1lbnQnIGRvZXMgbm90IGV4aXN0IG9uIHR5cGUgJ0Zvcm1Db250cm9sJ1wiLlxyXG5UaGlzIGhhcHBlbnMgYmVjYXVzZSBJJ3ZlIGV4cGFuZGVkIGNvbnRyb2wgd2l0aCBuYXRpdmVFbGVtZW50IHZpYVxyXG4nTmF0aXZlRWxlbWVudEluamVjdG9yRGlyZWN0aXZlJyB0byBnZXQgYW4gYWNjZXNzIHRvIHRoZSBlbGVtZW50LlxyXG5Nb3JlIGFib3V0IHRoaXMgYXBwcm9hY2ggYW5kIHJlYXNvbnMgZm9yIHRoaXM6XHJcbmh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE4MDI1XHJcbmh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NDA3NTExOS8xNjE3NTkwXHJcbiovXHJcbmV4cG9ydCBjb25zdCBwaG9uZU51bWJlclZhbGlkYXRvciA9IChjb250cm9sOiBhbnkpID0+IHtcclxuXHJcblx0XHJcblx0aWYgKCFjb250cm9sLnZhbHVlKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdC8vIEZpbmQgPGlucHV0PiBpbnNpZGUgaW5qZWN0ZWQgbmF0aXZlRWxlbWVudCBhbmQgZ2V0IGl0cyBcImlkXCIuXHJcblx0Y29uc3QgZWw6IEhUTUxFbGVtZW50ID0gY29udHJvbC5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xyXG5cclxuXHQvLyBjb25zdCBjb3VudHJ5Q29kZSA9IGVsPy5nZXRBdHRyaWJ1dGUoJ25nLXJlZmxlY3Qtc2VsZWN0ZWQtY291bnRyeS1pLXMtbycpO1xyXG5cdGNvbnN0IGRpYWxDb2RlID0gY29udHJvbC52YWx1ZS5zcGxpdCgnICcpWzBdLnN1YnN0cmluZygxKTtcclxuXHJcblx0Y29uc3QgYWxsQ291bnRyeSA9IG5ldyBDb3VudHJ5Q29kZSgpLmFsbENvdW50cmllc1xyXG5cdGNvbnN0IGNvdW50cnlDb2RlID0gYWxsQ291bnRyeS5maWx0ZXIoKGNvZGUpID0+IGNvZGVbMl0gPT09IGRpYWxDb2RlKVswXVsxXVxyXG5cdFxyXG5cdGNvbnN0IGlucHV0Qm94OiBIVE1MSW5wdXRFbGVtZW50ID0gZWxcclxuXHRcdD8gZWwucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRlbFwiXScpXHJcblx0XHQ6IHVuZGVmaW5lZDtcclxuXHRpZiAoaW5wdXRCb3gpIHtcclxuXHRcdGNvbnN0IGlkID0gaW5wdXRCb3guaWQ7XHJcblx0XHRjb25zdCBpc0NoZWNrVmFsaWRhdGlvbiA9IGlucHV0Qm94LmdldEF0dHJpYnV0ZSgndmFsaWRhdGlvbicpO1xyXG5cdFx0aWYgKGlzQ2hlY2tWYWxpZGF0aW9uID09PSAndHJ1ZScpIHtcclxuXHRcdFx0Y29uc3QgaXNSZXF1aXJlZCA9IGNvbnRyb2wuZXJyb3JzICYmIGNvbnRyb2wuZXJyb3JzLnJlcXVpcmVkID09PSB0cnVlO1xyXG5cdFx0XHRjb25zdCBlcnJvciA9IHsgdmFsaWRhdGVQaG9uZU51bWJlcjogeyB2YWxpZDogZmFsc2UgfSB9O1xyXG5cclxuXHRcdFx0aW5wdXRCb3guc2V0Q3VzdG9tVmFsaWRpdHkoJ0ludmFsaWQgZmllbGQuJyk7XHJcblxyXG5cdFx0XHRsZXQgbnVtYmVyOiBscG4uUGhvbmVOdW1iZXI7XHJcblxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdG51bWJlciA9IGxwbi5QaG9uZU51bWJlclV0aWwuZ2V0SW5zdGFuY2UoKS5wYXJzZShcclxuXHRcdFx0XHRcdGNvbnRyb2wudmFsdWUsXHJcblx0XHRcdFx0XHRjb3VudHJ5Q29kZVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRpZiAoaXNSZXF1aXJlZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGVycm9yO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpbnB1dEJveC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY29udHJvbC52YWx1ZSkge1xyXG5cdFx0XHRcdGlmICghbnVtYmVyKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZXJyb3I7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0IWxwbi5QaG9uZU51bWJlclV0aWwuZ2V0SW5zdGFuY2UoKS5pc1ZhbGlkTnVtYmVyRm9yUmVnaW9uKFxyXG5cdFx0XHRcdFx0XHRcdG51bWJlcixcclxuXHRcdFx0XHRcdFx0XHRjb3VudHJ5Q29kZVxyXG5cdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGVycm9yO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aW5wdXRCb3guc2V0Q3VzdG9tVmFsaWRpdHkoJycpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChpc0NoZWNrVmFsaWRhdGlvbiA9PT0gJ2ZhbHNlJykge1xyXG5cdFx0XHRpbnB1dEJveC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XHJcblxyXG5cdFx0XHRjb250cm9sLmNsZWFyVmFsaWRhdG9ycygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm47XHJcbn07XHJcbiJdfQ==