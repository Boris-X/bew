import Swal from "sweetalert2";

export default new class swal {
    success(title, text) {
        Swal.fire({
            type: 'success',
            title: title,
            html: text,
            showConfirmButton: false,
            timer: 1500
        })
    }

    error(title, text) {
        Swal.fire({
            type: 'error',
            title: title,
            html: text,
            showConfirmButton: false,
            timer: 1500
        })
    }
}