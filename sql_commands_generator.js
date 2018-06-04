
var demo = new Vue({
    el: '#main',
    data: {
        tableName: 'table',
        resultListCommands: 'result',
    	// Определяем свойства модели, представление будет проходить циклом
        // по массиву услуг и генерировать элементы списка
        // для каждого вложенного пункта.
        services: [
        	{
        		name: 'SELECT',
                active: true,
                desc: 'Выборка данных',
                template: 'SELECT * FROM %s WHERE /*УСЛОВИЕ*/;'
        	},
            {
                name: 'SELECT с INNER JOIN ',
                active: true,
                desc: 'Выборка данных из нескольких таблиц',
                template: 'SELECT * FROM %s tbl1 INNER JOIN table2 tbl2  ON tbl1.column1 = tbl2.column2 WHERE /*УСЛОВИЕ*/;'
            },            
            {
        		name: 'UPDATE',
                active: false,
                desc: 'Обновление данных',
                template: 'UPDATE %s SET A=B WHERE /*УСЛОВИЕ*/;'
        	},
            {
        		name: 'DELETE',
                active: false,
                desc: 'Удаление данных',
                template: 'DELETE FROM  %s WHERE /*УСЛОВИЕ*/;'

        	},
            {
        		name: 'TRUNCATE',
                active: false,
                desc: 'Полная очистка таблицы',
                template: 'TRUNCATE %s;'
        	}
        ]
    },
    created: function()
    {
        this.calcResultList();
    },
    methods: {

        copy2Clipboard: function()
        {

            copyToClipboard(copiedDesc);
            $(this).html('Скопировано');
            setTimeout(function(btn)
                {
                    $(btn).html('Копировать sql');
                }, 1000, this);
        },
    	toggleActive: function(s){
            console.log(s);
            s.active = !s.active;
            this.calcResultList();
    	},
    	total: function(){

        	var activeCount = 0;

        	this.services.forEach(function(s){
        		if (s.active){
        			++activeCount;
        		}
        	});

    	   return activeCount;
        },
        calcResultList: function()
        {
            var commands = '';
            var locTableName = this.tableName;
            this.services.forEach(function(s){
                if (s.active){
                    commands += ('--' + s.desc);
                    commands += '\r\n';
                    commands += (s.template.replace(/%s/i, locTableName));
                    commands += '\r\n';
                    commands += '\r\n';
                }
            });

        this.resultListCommands = commands;
        },
        keyupTableName: function()
        {
            this.calcResultList();
        }
    }
});


//копирование текста в буффер обмена
function copyToClipboard(text) {
var element = $('<textarea>').appendTo('body').val(text).select();
document.execCommand('copy');
element.remove();  
}

$(document).ready(function()
{
    $("button[name='copy2clipboard']").on('click', function()
        {         
            copyToClipboard($('textarea[name=result]').val());
            $(this).html('Скопировано');
            setTimeout(function(btn)
                {
                    $(btn).html('Копировать sql');
                }, 1000, this);
        });
});

