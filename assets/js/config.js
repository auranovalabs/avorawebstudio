/*
==========================================================================
SITE CONFIGURATION
==========================================================================
Do not commit this file to a public repository.
The key below is obfuscated to avoid automated scraping by bots.
==========================================================================
*/

const _siteConfig = {
    // Web3Forms access key (base64-encoded for basic obfuscation)
    _k: 'MGFmOWI3ZmEtOWEwOS00ZmVlLTk3MzctMTlhYmIwYzM4MzhmOg==',
    getFormKey: function () {
        try {
            return atob(this._k).replace(/:$/, '');
        } catch (e) {
            return '';
        }
    }
};
