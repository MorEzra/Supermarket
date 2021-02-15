export default class SnackbarUtils {
    public static openSnackBar = (message: string, action: string, comp: any) => {
        comp.snackBar.open(message, action, {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }
}