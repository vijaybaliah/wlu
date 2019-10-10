var widget = {
    name: "imagepicker-multiple",
    isFit : function(question) {
      return question.getType() === 'imagepicker-multiple';
    },
    isDefaultRender: true,
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass(
        "imageitemvalues",
        [],
        null,
        "itemvalue"
      );
      Survey.JsonObject.metaData.addClass(
        "imagepicker-multiple",
        [
          { name: "hasOther", visible: false },
          { name: "otherText", visible: false },
          { name: "optionsCaption", visible: false },
          { name: "otherErrorText", visible: false },
          { name: "storeOthersAsComment", visible: false },
          { name: "renderAs", visible: false }
        ],
        null,
        "dropdown"
      );
      Survey.JsonObject.metaData.addProperty("imagepicker-multiple", {
        name: "imageLink"
      });
      Survey.JsonObject.metaData.addProperty("imagepicker-multiple", {
        name: "showLabel:boolean",
        default: false
      });
      Survey.JsonObject.metaData.addProperty("imagepicker-multiple", {
        name: "choices:imageitemvalues",
        onGetValue: function(obj) {
          return Survey.ItemValue.getData(obj.choices);
        },
        onSetValue: function(obj, value) {
          obj.choices = value;
        }
      });
    },
    afterRender: function(question, el) {
        var $el = $(el).find("select");
        $el.attr("multiple", "multiple");
    
        var options = $el.find('option');
        for (var i=1; i<options.length; i++) {
            $(options[i]).data("imgSrc", question.choices[i-1].imageLink);
            options[i].selected = question.value == options[i].value;
        }
        $el.imagepicker({
            hide_select : true,
            show_label  : false,
            changed: function(oldValues, newValues) {
              question.value = (newValues || []).filter(function(val) { return !!val; });
            }
        })
    },
       willUnmount: function(question, el) {
        var $el = $(el).find("select");
        $el.removeAttr("multiple");
        $el.data('picker').destroy();
    } 
}
Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");