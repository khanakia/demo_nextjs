const Footer = () => {
  var d = new Date();
	var year = d.getFullYear();
	return (
		<footer className=''>
			<div>
				{`Copyright © ${year} Gamerapp. All rights reserved.`}
			</div>
		</footer>
	);
};

export default Footer
