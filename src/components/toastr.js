import toastr from 'toastr'
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  export function showMessage(title,message,type){
    toastr[type](message, title)
  }
  export function showMessageError(title,message){
    if(title == null){
        title = "Erro";
    }      
    showMessage(title,message,'error')
  }
  export function showMessageSuccess(title,message){
    if(title == null){
        title = "Sucesso";
    }      
    showMessage(title,message,'success')
  }
  export function showMessageAlert(title,message){
    if(title == null){
        title = "Alerta";
    }      
    showMessage(title,message,'alert')
  }