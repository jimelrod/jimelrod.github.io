// Static Utility class for... well... random shit...

export class Util {
    
    // Adds an attribute to a DOM element
    static AddAttributeToElement(ele, attrName, attrValue) {
        let attr = document.createAttribute(attrName);
        attr.value = attrValue;
        ele.attributes.setNamedItem(attr);
    }
}