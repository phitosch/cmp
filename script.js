function AganGDPRcontrol(force) {

    var self = this;

    self.config = {
        'lang': {
            'saveIndividual': 'Cookies individuell festlegen',
            'chooseIndividual': 'Einstellungen speichern',
            'allowAll': 'Alle Cookies akzeptieren',
            'footerText': 'Wir verwenden auf unseren Webseiten eigene und fremde Cookies: Notwendige Cookies, die für die Nutzung unserer Webseiten zwingend erforderlich sind, sowie Marketing Cookies, die Dir mehr Komfort bei der Nutzung unserer Webseiten bieten, mit denen wir aggregierte Daten zur Webseitennutzung und Statistiken generieren und zum Anzeigen relevanter Inhalte und Werbung. Wenn du auf "Cookies akzeptieren" klickst, stimmst du der Verwendung aller Cookies zu. Unter "Cookies individuell auswählen" kannst Du eine individuelle Auswahl treffen und erteilte Einwilligungen jederzeit für die Zukunft widerrufen. Weitere Informationen findest du in unserer Cookie-Richtlinie. <a href="">Impressum</a> &middot; <a href="">Hinweise zum Datenschutz</a>',
            'layerTitle': 'Einstellungspräferenzen wählen',
            'layerFunctionalTitle': 'Unbedingt erforderliche Cookies',
            'layerFunctionalText': 'Unbedingt erforderliche Cookies sind solche Cookies, die die Funktionen unserer Webseite gewährleisten. Ohne die unbedingt erforderlichen Cookies kann die Webseite nicht wie vorgesehen genutzt werden. Sie werden beispielsweise benötigt, um Ihnen die Warenkorb-Funktion über mehrere Seiten hinweg anzubieten oder dafür, dass ein angemeldeter Nutzer beim Zugriff auf verschiedene Unterseiten einer Webseite angemeldet bleibt und beim Aufruf einer neuen Seite nicht immer wieder die Anmeldedaten neu eingeben muss. Unbedingt erforderliche Cookies sind nur Cookies von unserer Plattform, alle Informationen, die in den Cookies gespeichert sind, gehen nur an unsere Plattform und werden nicht an Dritte geschickt. Rechtsgrundlage für die Nutzung von unbedingt erforderlichen Cookies auf unserer Webseite ist Art. 6 Abs. 1 lit f) DSGVO (berechtigtes Interesse, hier an der technisch einwandfreien Bereitstellung unserer Webseite und der darüber angebotenen Leistungen) Die Nutzung von unbedingt erforderlichen Cookies ist ohne Ihre vorherige Einwilligung möglich und zulässig. Sie können die unbedingt erforderlichen Cookies insgesamt über die Browsereinstellungen deaktivieren, dies kann allerdings zu Funktionseinschränkungen im Zusammenhang mit der Nutzung unserer Webseite führen. <a href="">Hinweise zum Datenschutz</a>',
            'layerAnalyticsTitle': 'Analyse Cookies',
            'layerAnalyticsText': 'Diese Cookies ermöglichen es uns, Besuche und Verkehrsquellen zu zählen, damit wir die Leistung unserer Website messen und verbessern können. Sie unterstützen uns bei der Beantwortung der Fragen, welche Seiten am beliebtesten sind, welche am wenigsten genutzt werden und wie sich Besucher auf der Website bewegen. Alle von diesen Cookies erfassten Informationen werden aggregiert und sind deshalb anonym. Wenn Sie diese Cookies nicht zulassen, können wir nicht wissen, wann Sie unsere Website besucht haben. <a href="">Hinweise zum Datenschutz</a>',
            'layerMarketingTitle': 'Marketing Cookies',
            'layerMarketingText': 'Marketing Cookies sammeln Informationen darüber, wie unsere Webseite genutzt wird, um deren Attraktivität, Inhalt und Funktionalität zu verbessern. Diese Cookies helfen uns zu bestimmen, ob, welche, wie oft und und wie lange Unterseiten unserer Webseite besucht werden und für welche Inhalte sich die Nutzer besonders interessieren. Ferner erfassen wir Bewegungen, „Klicks“ und das Scrollen mit der Computermaus, um zu verstehen, welche Bereiche unserer Webseite die Nutzer besonders interessieren. Diese Cookies speichern keine Informationen, die eine Identifikation des Nutzers zulassen. Die gesammelten Informationen sind aggregiert und ermöglichen uns keinen unmittelbaren Rückschluss auf deine Person. Sie dienen allein dazu, Statistiken zu erstellen, um die Inhalte unserer Webseite gezielter auf die Bedürfnisse unserer Nutzer abzustimmen, das Nutzerlebnis zu verbessern und unser Angebot zu optimieren. Marketing Cookies werden ferner verwendet, um Informationen über die vom Benutzer besuchten Webseiten zu sammeln, um zielgruppenorientierte Werbung für den Benutzer zu erstellen und an seinen Interessen ausgerichtete Werbeanzeigen auszuspielen. Sie werden außerdem dazu verwendet, die Erscheinungshäufigkeit einer Anzeige zu begrenzen und die Effektivität von Werbekampagnen zu messen. Diese Cookies können Informationen an unsere Plattform, oder an eine andere Webseite, zu der das Cookie gehört (Third Party Cookie) geschickt werden. Rechtsgrundlage für die Nutzung der Marketing Cookies ist Art. 6 Abs. 1 a) DSGVO inVerbindung mit Ihrer Einwilligung. <a href="">Hinweise zum Datenschutz</a>',
        },
    };

    self.force = force || false;
    self.marketing = false;
    self.analytics = false;
    self.cookie = '';

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return false;
    }

    function checkLoaded() {
        return document.readyState === "complete" || document.readyState === "interactive";
    }

    function done() {
        var allow = 'functional';
        if (self.analytics) allow += ',analytics';
        if (self.marketing) allow += ',marketing';
        window.dataLayer = window.dataLayer || [];
        if(checkLoaded()){
            window.dataLayer.push({'event':'gdpr','gdpr_allow':allow});
        } else {
            document.addEventListener('DOMContentLoaded',function(){
                window.dataLayer.push({'event':'gdpr','gdpr_allow':allow});
            })
        }
        setCookie('gdpr', allow, 30);
        document.getElementById('agan_gdpr').remove();
    }

    function toggleTo(section) {
        document.getElementById('agan_gdpr-footer').style.display = 'none';
        document.getElementById('agan_gdpr-details').style.display = 'none';
        document.getElementById('agan_gdpr-' + section).style.display = 'block';
    }

    function bindActionsToOverlayElements() {
        document.getElementById('agan_gdpr-footer-actions-default').addEventListener('click', function () {
            toggleTo('details');
        });
        document.getElementById('agan_gdpr-details-close').addEventListener('click', function () {
            toggleTo('footer');
        });
        document.getElementById('agan_gdpr-details-actions-success').addEventListener('click', function () {
            self.analytics = true;
            self.marketing = true;
            done();
        });
        document.getElementById('agan_gdpr-footer-actions-success').addEventListener('click', function () {
            self.analytics = true;
            self.marketing = true;
            done();
        });
        document.getElementById('agan_gdpr-details-actions-default').addEventListener('click', function () {
            if (document.getElementById('agan_gdpr-checkbox-analytics').checked === true) self.analytics = true;
            if (document.getElementById('agan_gdpr-checkbox-marketing').checked === true) self.marketing = true;
            done();
        });
    }

    function showConsentOverlay() {

        self.layerActive = true;
        var css = document.createElement('style');
        css.innerHTML = '' +
            '.agan_gdpr,.agan_gdpr *{' +
            'box-sizing:border-box;' +
            '}' +
            '.agan_gdpr{' +
            'position:fixed;' +
            'left:0;' +
            'top:0;' +
            'height:100%;' +
            'width:100%;' +
            'background-color:rgba(255,255,255,.5);' +
            'z-index:99999;' +
            'color:#000;' +
            '}' +
            '.agan_gdpr a{' +
            'color:#00f;' +
            '}' +
            '.agan_gdpr-bg{' +
            'position:fixed;' +
            'left:0;' +
            'top:0;' +
            'height:100%;' +
            'width:100%;' +
            'backdrop-filter:blur(2px);' +
            '}' +
            '.agan_gdpr-footer{' +
            'width:100%;' +
            'position:absolute;' +
            'left:0;' +
            'bottom:0;' +
            'padding:8px;' +
            'background-color:#fff;' +
            'border-top:1px solid #ccc;' +
            'box-shadow: 0 0 18px rgba(0,0,0,.5);' +
            'z-index:2;' +
            '}' +
            '.agan_gdpr-footer-content{' +
            'font-size:15px;' +
            'line-height:17px;' +
            '}' +
            '.agan_gdpr-footer-actions{' +
            'width:80%;' +
            'margin:16px auto;' +
            '}' +
            '@media (min-width:888px){' +
            '.agan_gdpr-footer{' +
            'position:table;' +
            '}' +
            '.agan_gdpr-footer-content{' +
            'display:table-cell;' +
            'width:80%;' +
            'padding:20px;' +
            'vertical-align:middle;' +
            '}' +
            '.agan_gdpr-footer-actions{' +
            'display:table-cell;' +
            'width:20%;' +
            'padding:20px;' +
            'vertical-align:middle;' +
            '}' +
            '}' +
            '.agan_gdpr-footer-actions-default{' +
            'width:100%;' +
            'border:0;' +
            'display:block;' +
            'text-align:center;' +
            'color:#999;' +
            'text-decoration:underline;' +
            'background:transparent;' +
            'padding:8px;' +
            'max-width:320px;' +
            'margin:0 auto;' +
            '}' +
            '' +
            '.agan_gdpr-footer-actions-success{' +
            'width:100%;' +
            'padding:8px;' +
            'font-size:15px;' +
            'line-height:18px;' +
            'font-weight:bold;' +
            'display:block;' +
            'text-align:center;' +
            'color:#fff;' +
            'background:orange;' +
            'max-width:320px;' +
            'margin:0 auto;' +
            'cursor:pointer;' +
            'border-radius: 6px;' +
            'border: 1px solid #888;' +
            '}' +
            '.agan_gdpr-details{' +
            'display:none;' +
            'height:100%;' +
            'max-height:100%;' +
            'overflow-y:scroll;' +
            'font-size:15px;' +
            'line-height:18px;' +
            'padding:36px 4%;' +
            'background-color:rgba(255,255,255,.9);' +
            'z-index:2;' +
            '}' +
            '.agan_gdpr-details-container{' +
            'max-width:500px;' +
            'margin:0 auto;' +
            'position:relative;' +
            'padding:36px 0;' +
            '}' +
            '.agan_gdpr-details-title{' +
            'position:relative;' +
            'font-weight:bold;' +
            'font-size:18px;' +
            'line-height:21px;' +
            'margin:16px 0;' +
            'padding:0 30px 0 0;' +
            '}' +
            '.agan_gdpr-checkbox{' +
            'position:absolute;' +
            'right:0;' +
            'top:0;' +
            '}' +
            '.agan_gdpr-details-actions-default{' +
            'width:100%;' +
            'border:0;' +
            'display:block;' +
            'text-align:center;' +
            'color:#999;' +
            'text-decoration:underline;' +
            'background:transparent;' +
            'padding:8px;' +
            'max-width:320px;' +
            'margin:0 auto;' +
            '}' +
            '' +
            '.agan_gdpr-details-actions-success{' +
            'width:100%;' +
            'padding:8px;' +
            'font-size:15px;' +
            'line-height:18px;' +
            'font-weight:bold;' +
            'display:block;' +
            'text-align:center;' +
            'color:#fff;' +
            'background:orange;' +
            'max-width:320px;' +
            'margin:0 auto;' +
            'cursor:pointer;' +
            'border-radius: 6px;' +
            'border: 1px solid #888;' +
            '}' +
            '#agan_gdpr-details-close{' +
            'position: absolute;' +
            'right: 0px;' +
            'top: 0px;' +
            'font-size: 21px;' +
            'font-family: arial;' +
            'width: 30px;' +
            'height: 30px;' +
            'border-radius: 50%;' +
            'text-align: center;' +
            'border: 1px solid #000;' +
            'line-height: 25px;' +
            'cursor:pointer;' +
            '}';
        document.body.appendChild(css);

        var html = document.createElement('div');
        html.id = 'agan_gdpr';
        html.className = 'agan_gdpr';
        html.innerHTML = '' +
            '<div class="agan_gdpr-bg"></div>' +
            '<div id="agan_gdpr-details" class="agan_gdpr-details">' +
            '<div class="agan_gdpr-details-container">' +
            '<span id="agan_gdpr-details-close">x</span>' +
            '<div class="agan_gdpr-details-title">' +
            '' + self.config.lang.layerFunctionalTitle + '' +
            '<input type="checkbox" class="agan_gdpr-checkbox" name="agan_gdpr-checkbox-functional" id="agan_gdpr-checkbox-functional" value="1" checked onclick="return false;">' +
            '</div>' +
            '<div class="agan_gdpr-details-text">' + self.config.lang.layerFunctionalText + '</div>' +
            '<div class="agan_gdpr-details-title">' +
            '' + self.config.lang.layerAnalyticsTitle + '' +
            '<input type="checkbox" class="agan_gdpr-checkbox" name="agan_gdpr-checkbox-analytics" id="agan_gdpr-checkbox-analytics"" value="1">' +
            '</div>' +
            '<div class="agan_gdpr-details-text">' + self.config.lang.layerAnalyticsText + '</div>' +
            '<div class="agan_gdpr-details-title">' +
            '' + self.config.lang.layerMarketingTitle + '' +
            '<input type="checkbox" class="agan_gdpr-checkbox" name="agan_gdpr-checkbox-marketing" id="agan_gdpr-checkbox-marketing" value="1">' +
            '</div>' +
            '<div class="agan_gdpr-details-text">' + self.config.lang.layerMarketingText + '</div>' +
            '' +
            '<div class="agan_gdpr-details-actions">' +
            '<button id="agan_gdpr-details-actions-default" class="agan_gdpr-details-actions-default">' + self.config.lang.chooseIndividual + '</button>' +
            '<button id="agan_gdpr-details-actions-success" class="agan_gdpr-details-actions-success">' + self.config.lang.allowAll + '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="agan_gdpr-footer" class="agan_gdpr-footer">' +
            '<div class="agan_gdpr-footer-content">' + self.config.lang.footerText + '</div>' +
            '<div class="agan_gdpr-footer-actions">' +
            '<button id="agan_gdpr-footer-actions-success" class="agan_gdpr-footer-actions-success">' + self.config.lang.allowAll + '</button>' +
            '<button id="agan_gdpr-footer-actions-default" class="agan_gdpr-footer-actions-default">' + self.config.lang.saveIndividual + '</button>' +
            '</div>' +
            '</div>';
        document.body.appendChild(html);
        bindActionsToOverlayElements();
    }

    function initialize() {
        self.cookie = getCookie('gdpr');
        if (self.cookie !== false && self.force !== true) {
            if (self.cookie.indexOf('analytics') !== -1) self.analytics = true;
            if (self.cookie.indexOf('marketing') !== -1) self.marketing = true;
            done();
        }
        showConsentOverlay();
    }

    initialize();

}

(function () {
    new AganGDPRcontrol(false);
}());
