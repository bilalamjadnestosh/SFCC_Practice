'use strict';


module.exports = {
    stockQuery: function () {
        $('.outofstock-query-form').submit(function (e) {
            var form = $(this);
            e.preventDefault();
            var url = form.attr('action');
            form.spinner().start();
            //$('form.registration').trigger('login:register', e);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: form.serialize(),
                success: function (data) {
                    form.spinner().stop();
                    if (!data.success) {
                        // formValidation(form, data);
                        alert(data.errorMessage);
                    } else {
                        alert('Submitted!');
                        location.href = window.location.href;
                    }
                },
                error: function (err) {
                    alert('Error!');
                    form.spinner().stop();
                }
            });
            return true;
        });
    }

};
