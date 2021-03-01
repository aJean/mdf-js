{{#modules}}
import '{{{ . }}}';
{{/modules}}
{{^modules}}
import 'core-js';
{{/modules}}
import 'regenerator-runtime/runtime';
