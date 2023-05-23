import React from 'react';

import './ImageContent.css'
import '../UniversalCSS.css'

export default function ImageContent({className}) {
    return(
        <div className={className ? `${className}` : ""}>
            Hello
        </div>
    )
}
