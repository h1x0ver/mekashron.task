const submitBtn = document.getElementById('login-btn');

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    fetch('https://isapi.icu-tech.com/icutech-test.dll/wsdl/IICUTech')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {

        console.log(data)
        const serializer = new XMLSerializer();
        const xmlStr = serializer.serializeToString(data);
        const jsonXml = xmlToJson(data)
        jsonXml.definitions.message.forEach(element =>{

            console.log(element.part[1]["@attributes"].name)
            if (userName === element.part[0]["@attributes"].name && password ===  element.part[1]["@attributes"].name) {
                alert("hersey okeydir");
                location.reload();
            } else {
                alert('alinmadi')
            }
        })
        
    });
});


function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};
	if (xml.nodeType == 1) { 
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) {
		obj = xml.nodeValue;
	}

	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
