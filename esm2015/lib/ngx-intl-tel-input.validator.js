import * as lpn from 'google-libphonenumber';
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
    const countryCode = el === null || el === void 0 ? void 0 : el.getAttribute('ng-reflect-selected-country-i-s-o');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1pbnRsLXRlbC1pbnB1dC9zcmMvbGliL25neC1pbnRsLXRlbC1pbnB1dC52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEdBQUcsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7RUFRRTtBQUNGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLENBQUMsT0FBWSxFQUFFLEVBQUU7SUFHcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7UUFDbkIsT0FBTztLQUNQO0lBQ0QsK0RBQStEO0lBQy9ELE1BQU0sRUFBRSxHQUFnQixPQUFPLENBQUMsYUFBNEIsQ0FBQztJQUM3RCxNQUFNLFdBQVcsR0FBRyxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsWUFBWSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDMUUsTUFBTSxRQUFRLEdBQXFCLEVBQUU7UUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7UUFDdkMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNiLElBQUksUUFBUSxFQUFFO1FBQ2IsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUN2QixNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUQsSUFBSSxpQkFBaUIsS0FBSyxNQUFNLEVBQUU7WUFDakMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUM7WUFDdEUsTUFBTSxLQUFLLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBRXhELFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTdDLElBQUksTUFBdUIsQ0FBQztZQUU1QixJQUFJO2dCQUNILE1BQU0sR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FDL0MsT0FBTyxDQUFDLEtBQUssRUFDYixXQUFXLENBQ1gsQ0FBQzthQUNGO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1gsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO29CQUN4QixPQUFPLEtBQUssQ0FBQztpQkFDYjtxQkFBTTtvQkFDTixRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQy9CO2FBQ0Q7WUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1osT0FBTyxLQUFLLENBQUM7aUJBQ2I7cUJBQU07b0JBQ04sSUFDQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsc0JBQXNCLENBQ3hELE1BQU0sRUFDTixXQUFXLENBQ1gsRUFDQTt3QkFDRCxPQUFPLEtBQUssQ0FBQztxQkFDYjt5QkFBTTt3QkFDTixRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQy9CO2lCQUNEO2FBQ0Q7U0FDRDthQUFNLElBQUksaUJBQWlCLEtBQUssT0FBTyxFQUFFO1lBQ3pDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUUvQixPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7S0FDRDtJQUNELE9BQU87QUFDUixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBscG4gZnJvbSAnZ29vZ2xlLWxpYnBob25lbnVtYmVyJztcclxuXHJcbi8qXHJcbldlIHVzZSBcImNvbnRyb2w6IGFueVwiIGluc3RlYWQgb2YgXCJjb250cm9sOiBGb3JtQ29udHJvbFwiIHRvIHNpbGVuY2U6XHJcblwiUHJvcGVydHkgJ25hdGl2ZUVsZW1lbnQnIGRvZXMgbm90IGV4aXN0IG9uIHR5cGUgJ0Zvcm1Db250cm9sJ1wiLlxyXG5UaGlzIGhhcHBlbnMgYmVjYXVzZSBJJ3ZlIGV4cGFuZGVkIGNvbnRyb2wgd2l0aCBuYXRpdmVFbGVtZW50IHZpYVxyXG4nTmF0aXZlRWxlbWVudEluamVjdG9yRGlyZWN0aXZlJyB0byBnZXQgYW4gYWNjZXNzIHRvIHRoZSBlbGVtZW50LlxyXG5Nb3JlIGFib3V0IHRoaXMgYXBwcm9hY2ggYW5kIHJlYXNvbnMgZm9yIHRoaXM6XHJcbmh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE4MDI1XHJcbmh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NDA3NTExOS8xNjE3NTkwXHJcbiovXHJcbmV4cG9ydCBjb25zdCBwaG9uZU51bWJlclZhbGlkYXRvciA9IChjb250cm9sOiBhbnkpID0+IHtcclxuXHJcblx0XHJcblx0aWYgKCFjb250cm9sLnZhbHVlKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdC8vIEZpbmQgPGlucHV0PiBpbnNpZGUgaW5qZWN0ZWQgbmF0aXZlRWxlbWVudCBhbmQgZ2V0IGl0cyBcImlkXCIuXHJcblx0Y29uc3QgZWw6IEhUTUxFbGVtZW50ID0gY29udHJvbC5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xyXG5cdGNvbnN0IGNvdW50cnlDb2RlID0gZWw/LmdldEF0dHJpYnV0ZSgnbmctcmVmbGVjdC1zZWxlY3RlZC1jb3VudHJ5LWktcy1vJyk7XHJcblx0Y29uc3QgaW5wdXRCb3g6IEhUTUxJbnB1dEVsZW1lbnQgPSBlbFxyXG5cdFx0PyBlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwidGVsXCJdJylcclxuXHRcdDogdW5kZWZpbmVkO1xyXG5cdGlmIChpbnB1dEJveCkge1xyXG5cdFx0Y29uc3QgaWQgPSBpbnB1dEJveC5pZDtcclxuXHRcdGNvbnN0IGlzQ2hlY2tWYWxpZGF0aW9uID0gaW5wdXRCb3guZ2V0QXR0cmlidXRlKCd2YWxpZGF0aW9uJyk7XHJcblx0XHRpZiAoaXNDaGVja1ZhbGlkYXRpb24gPT09ICd0cnVlJykge1xyXG5cdFx0XHRjb25zdCBpc1JlcXVpcmVkID0gY29udHJvbC5lcnJvcnMgJiYgY29udHJvbC5lcnJvcnMucmVxdWlyZWQgPT09IHRydWU7XHJcblx0XHRcdGNvbnN0IGVycm9yID0geyB2YWxpZGF0ZVBob25lTnVtYmVyOiB7IHZhbGlkOiBmYWxzZSB9IH07XHJcblxyXG5cdFx0XHRpbnB1dEJveC5zZXRDdXN0b21WYWxpZGl0eSgnSW52YWxpZCBmaWVsZC4nKTtcclxuXHJcblx0XHRcdGxldCBudW1iZXI6IGxwbi5QaG9uZU51bWJlcjtcclxuXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0bnVtYmVyID0gbHBuLlBob25lTnVtYmVyVXRpbC5nZXRJbnN0YW5jZSgpLnBhcnNlKFxyXG5cdFx0XHRcdFx0Y29udHJvbC52YWx1ZSxcclxuXHRcdFx0XHRcdGNvdW50cnlDb2RlXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGlmIChpc1JlcXVpcmVkID09PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZXJyb3I7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlucHV0Qm94LnNldEN1c3RvbVZhbGlkaXR5KCcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjb250cm9sLnZhbHVlKSB7XHJcblx0XHRcdFx0aWYgKCFudW1iZXIpIHtcclxuXHRcdFx0XHRcdHJldHVybiBlcnJvcjtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHQhbHBuLlBob25lTnVtYmVyVXRpbC5nZXRJbnN0YW5jZSgpLmlzVmFsaWROdW1iZXJGb3JSZWdpb24oXHJcblx0XHRcdFx0XHRcdFx0bnVtYmVyLFxyXG5cdFx0XHRcdFx0XHRcdGNvdW50cnlDb2RlXHJcblx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZXJyb3I7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpbnB1dEJveC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGlzQ2hlY2tWYWxpZGF0aW9uID09PSAnZmFsc2UnKSB7XHJcblx0XHRcdGlucHV0Qm94LnNldEN1c3RvbVZhbGlkaXR5KCcnKTtcclxuXHJcblx0XHRcdGNvbnRyb2wuY2xlYXJWYWxpZGF0b3JzKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybjtcclxufTtcclxuIl19