/**
 * A "Fake" module to require FosJsRoutingBundle
 * @see https://github.com/symfony/webpack-encore/issues/97
 * @see https://github.com/symfony/webpack-encore/issues/5#issuecomment-308101272
 */

import routes from '../../json/fos_js_routes.json'
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js'
Routing.setRoutingData(routes)

export default Routing