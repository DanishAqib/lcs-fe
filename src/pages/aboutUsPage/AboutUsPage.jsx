import React from 'react'
import { Navbar } from '../../components/Navbar'
import "./aboutUsPage.css"

export const AboutUsPage = () => {
  return (
    <>
        <div className='page-container'>
            <Navbar />
            <div className='about-us-page-content'>
                <h2 className='content-title'>About Us</h2>
                <div className='about-us-body'>
                    <p>In the society, that we live in nowadays, with countless laws being imposed to a common man, it is quite hard for the public to keep up with it and also it should not be expected from the people to understand the technicalities of the laws as the complexities of the laws can increase drastically and people may not understand it fully and act on them based on there understanding of the laws. E-lawyer offers legal consultation services from law experts to help common people understand the technical details of the laws. Moreover, people can hire the lawyers for there own cases or for there own consultation.</p>
                    <p>Most people interact very rarely with kachahri/court ecosystem and when they do have to seek assistance of court then due to lack of general know how, finding a good and trustworthy lawyer for their case becomes a difficult task. Moreover, it often happens that the lawyers they find usually accept the bribes and they can in return harmful for them, this atmosphere of unfaithfulness has lead the people away from this lawyer system and naturally, people get uncomfortable seeking assistance from lawyers which in return damages them as the law is still applicable on them and they unknowingly, get into unlawful acts and if they don't have a proper lawyer to justify for them in court, they can be sentenced to some very hard punishments for the crimes which they may not even have committed in the first place.</p>
                    <p>The scope extends to people living in different areas and they are able to contact the lawyers of there own area from the comfort of there home. The same goes for lawyers too and they will get requests from people who are from there same area, which will greatly reduce there burden. </p>
                </div>
            </div>
        </div>
    </>
  )
}
