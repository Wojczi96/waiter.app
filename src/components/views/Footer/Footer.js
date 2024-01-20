import React from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';


const Footer= () => {
    return(
        <MDBFooter className='text-muted text-center text-white mt-2'>
            <MDBContainer className='p-3'>
                <section>
                    <p>Copyright © PizzeriaApp 2024</p>
                </section>
            </MDBContainer>
        </MDBFooter>
    );
}

export default Footer;