'use client';

export default async function Nieuws() {
  return (
    <>
      <h1 className="pb-4 text-xl font-semibold text-vilvBlue">Nieuws</h1>
      <iframe
        name="f8da66e845dc1b65a"
        width="500px"
        height="1000px"
        data-testid="fb:page Facebook Social Plugin"
        title="fb:page Facebook Social Plugin"
        frameBorder="0"
        allowFullScreen={true}
        scrolling="no"
        allow="encrypted-media"
        src="https://www.facebook.com/v11.0/plugins/page.php?adapt_container_width=true&amp;app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df4b701dde46d59440%26domain%3Dwww.fcvilvheverlee.be%26is_canvas%3Dfalse%26origin%3Dhttp%253A%252F%252Fwww.fcvilvheverlee.be%252Ff289942d4d51f4eb4%26relation%3Dparent.parent&amp;container_width=690&amp;height=1000&amp;hide_cover=true&amp;href=https%3A%2F%2Fwww.facebook.com%2FFC-VILv-Heverlee-144826495622899&amp;locale=nl_BE&amp;sdk=joey&amp;show_facepile=false&amp;small_header=true&amp;tabs=timeline&amp;width=500"
        style={{ border: 'none', visibility: 'visible', width: '500px', height: '271px' }}
        className=""
      ></iframe>
    </>
  );
}
