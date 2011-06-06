$.fn.focusNextInputField = function() {
    return this.each(function() {
        var fields = $(this).parents('form:eq(0),body').find(':input').not('[type=hidden]')
		;
        var index = fields.index( this );
        if ( index > -1 && ( index + 1 ) < fields.length ) {
            fields.eq( index + 1 ).focus();
        }
        return false;
    });
};