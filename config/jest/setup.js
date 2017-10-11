
/**
 * (C) Copyright IBM Corp. 2017 All Rights Reserved
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has
 * been deposited with the U.S. Copyright Office.
 */

'use strict';

const enzyme = require.requireActual('enzyme');
const Adapter = require.requireActual('enzyme-adapter-react-15');

// Configure enzyme to work with React 15 for now
enzyme.configure({ adapter: new Adapter() });
