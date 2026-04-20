"use client";

import React from "react";

interface Founder {
  rank: number;
  name: string;
  company: string;
  location: string;
  peak: string;
  description: string;
  wikipediaUrl: string;
}

const FOUNDERS: Founder[] = [
  {
    rank: 1,
    name: "Tobias Lütke",
    company: "Shopify",
    location: "Ottawa, ON",
    peak: "$300B+ market cap",
    description: "German-born Tobias \"Tobi\" Lütke immigrated to Canada in 2002 and co-founded Shopify in 2006 after building an e-commerce platform for his online snowboard shop, Snowdevil. What began as a side project using Ruby on Rails became the backbone of global e-commerce, powering millions of merchants in over 100 countries. Shopify went public in 2015, and under Lütke’s leadership grew into Canada’s second most valuable company with a market capitalization exceeding $200 billion. A core contributor to the Ruby on Rails framework and creator of open-source libraries like Active Merchant and Liquid, Lütke was named Globe and Mail CEO of the Year in 2014 and received the Meritorious Service Cross in 2018. With a personal net worth exceeding $12 billion, he ranks among Canada’s wealthiest individuals. He has championed AI integration at Shopify, donated over $1 million to environmental causes through Team Trees, and competes as a racing driver in the IMSA SportsCar Championship.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Tobias_L%C3%BCtke"
  },
  {
    rank: 2,
    name: "Mike Lazaridis",
    company: "BlackBerry (Research In Motion)",
    location: "Waterloo, ON",
    peak: "$130B adjusted peak",
    description: "Born in Istanbul to Greek parents and raised in Windsor, Ontario, Mike Lazaridis co-founded Research In Motion (RIM) in 1984 while still a student at the University of Waterloo. RIM’s first breakthrough was an award-winning barcode reader for the film industry, earning both an Academy Award (1999) and an Emmy (1994) for technical achievement. The profits funded wireless research that produced the BlackBerry in 1999, a device that fundamentally changed how the world communicates. At its peak, BlackBerry had over 80 million subscribers and RIM’s market cap exceeded $80 billion. Lazaridis was named one of TIME’s 100 Most Influential People in 2000, an Officer of the Order of Canada in 2006, and a Fellow of the Royal Society in 2014. Beyond BlackBerry, his philanthropy is staggering: he donated over $170 million to found the Perimeter Institute for Theoretical Physics and over $100 million to the Institute for Quantum Computing at the University of Waterloo. He co-founded Quantum Valley Investments in 2013 to commercialize quantum breakthroughs. Lazaridis holds over 30 patents in wireless technology.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Mike_Lazaridis"
  },
  {
    rank: 3,
    name: "Mark Leonard",
    company: "Constellation Software",
    location: "Toronto, ON",
    peak: "$112B market cap",
    description: "Mark Leonard is the reclusive, intensely private founder of Constellation Software, often called the Warren Buffett of Canadian tech. After earning a degree from the University of Guelph and working in venture capital at Ventures West, Leonard founded Constellation Software in 1995 with $25 million in capital. His vision was simple but radical: acquire niche vertical market software companies and hold them forever. The strategy has produced one of the greatest investment returns in history. A $1,000 investment at Constellation’s 2006 IPO (shares priced near $18) would have grown to over $190,000 by 2024. The company now owns over 600 software businesses across 75+ verticals, employs over 50,000 people, and generates revenues exceeding US$6 billion. Leonard stepped down as president in 2025 due to health reasons but remains on the board. Known for his extraordinary shareholder letters and decentralized management philosophy, he has built one of the most durable technology conglomerates in the world.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Constellation_Software"
  },
  {
    rank: 4,
    name: "Terry Matthews",
    company: "Mitel / Newbridge Networks",
    location: "Ottawa, ON (Kanata)",
    peak: "$25.5B combined peak",
    description: "Sir Terry Matthews, born in Newport, Wales, is the godfather of Ottawa’s tech sector and has founded or funded over 100 companies in high-tech communications. After emigrating to Canada and joining Microsystems International, he co-founded Mitel in 1972 with Michael Cowpland. Mitel became a global leader in PBX systems and telecom semiconductors before British Telecom acquired a controlling stake in 1985. Undeterred, Matthews founded Newbridge Networks in 1986, building it into a worldwide data networking powerhouse with $1.8 billion in revenue and 6,500 employees. Alcatel acquired Newbridge for $7.1 billion in 2000, making Matthews the largest single shareholder in the French telecom giant and a billionaire. He later reacquired Mitel and invested over $600 million to reinvent it. Wales’ first billionaire, Matthews was knighted in 2001, holds an OBE, and is an Officer of the Order of Canada. He also owns the Celtic Manor Resort, which hosted the 2010 Ryder Cup and the 2014 NATO summit. Through Wesley Clover, he continues to invest in and incubate emerging tech firms.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Terry_Matthews"
  },
  {
    rank: 5,
    name: "Serge Godin",
    company: "CGI Inc.",
    location: "Montréal, QC",
    peak: "$37.5B market cap",
    description: "Serge Godin founded CGI in 1976 at the age of 26 with just $5,000 and two employees. Nearly five decades later, CGI is one of the largest independent IT and business consulting firms in the world, with 94,000 employees in over 40 countries and annual revenues exceeding $14 billion. Godin’s strategy combined disciplined organic growth with over 70 successful acquisitions, most notably the $2.6 billion purchase of UK-based Logica in 2012, which more than doubled CGI’s workforce and catapulted Godin to billionaire status. His proprietary CGI Management Foundation became the operational playbook for integrating every acquisition. Under his leadership, CGI has maintained an average of 25% annual growth for decades. Godin is an Officer of the Order of Canada, an Officer of the National Order of Quebec, a member of the Canadian Business Hall of Fame, a Chevalier de la Légion d’honneur of France, and holds six honorary doctorates. His family foundation has supported over 90 schools, hospitals, and youth organizations. With a net worth approaching $3 billion, he remains CGI’s controlling shareholder.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Serge_Godin"
  },
  {
    rank: 6,
    name: "Michael Cowpland",
    company: "Mitel / Corel",
    location: "Ottawa, ON",
    peak: "$10.3B combined peak",
    description: "Michael Cowpland is one of Canada’s most prolific tech entrepreneurs, having co-founded two major technology companies in Ottawa’s Silicon Valley North. Born in Sussex, England, Cowpland co-founded Mitel with Terry Matthews in 1972, growing it into a global telecom equipment manufacturer before British Telecom’s acquisition. He then founded Corel Corporation in 1985, which became best known for CorelDRAW, a graphics software suite that at its peak rivaled Adobe. Corel also acquired WordPerfect from Novell and developed a Linux distribution, positioning itself as a challenger to Microsoft’s office software dominance. At its dot-com peak, Corel’s market capitalization exceeded $6 billion. Cowpland’s contributions helped establish Ottawa as one of Canada’s premier technology corridors, seeding an ecosystem of talent and innovation that spawned dozens of subsequent companies.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Michael_Cowpland"
  },
  {
    rank: 7,
    name: "Dax Dasilva",
    company: "Lightspeed Commerce",
    location: "Montréal, QC",
    peak: "$21B market cap",
    description: "Dax Dasilva founded Lightspeed in 2005, building a cloud-based point-of-sale platform that today powers businesses in over 100 countries across retail, hospitality, and golf. Born in Vancouver to parents who fled Idi Amin’s Uganda as refugees, Dasilva became interested in programming at age 13. He took Lightspeed public on the TSX in 2019 in what the Financial Post called the most successful Canadian tech IPO in nearly a decade. The company later dual-listed on the NYSE. After stepping down as CEO in 2022, he returned to lead the company’s profitable growth phase in 2024. Dasilva is also an accomplished filmmaker and philanthropist. He won an Emmy Award as executive producer of the documentary Wildcat, and his 2025 documentary Yanuni won best documentary at the Environmental Media Awards. He donated $40 million to found the conservation nonprofit Age of Union Alliance and was awarded the King Charles III Coronation Medal in 2025 for his environmental work. He is one of Canada’s most prominent openly gay business leaders.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Dax_Dasilva"
  },
  {
    rank: 8,
    name: "Philip Fayer",
    company: "Nuvei",
    location: "Montréal, QC",
    peak: "$21B market cap",
    description: "Philip Fayer founded Nuvei in 2003 and built it into one of the world’s leading fintech payment platforms. Nuvei went public on the TSX in 2020 in the largest Canadian technology IPO at the time, raising over $800 million and briefly reaching a market cap exceeding $20 billion. The platform processes payments in over 200 markets with nearly 700 alternative payment methods, serving high-growth industries including e-commerce, gaming, and digital goods. In 2024, Nuvei was taken private by Advent International in a deal valuing the company at approximately $6.3 billion. Fayer, still in his early 40s, has been recognized as one of Canada’s most successful fintech entrepreneurs, transforming Montréal into a global payments hub.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Nuvei"
  },
  {
    rank: 9,
    name: "Aidan Gomez",
    company: "Cohere",
    location: "Toronto, ON",
    peak: "$9.5B valuation",
    description: "At just 20 years old, Aidan Gomez was an intern at Google Brain and one of eight co-authors of the landmark 2017 research paper \"Attention Is All You Need,\" which introduced the transformer architecture, arguably the most consequential AI paper ever published with over 120,000 citations. Growing up in rural Brighton, Ontario on a 150-acre property without a TV, Gomez studied computer science and mathematics at the University of Toronto before pursuing a PhD at Oxford (completed in 2024). In 2019, he co-founded Cohere with Nick Frosst and Ivan Zhang to bring enterprise-grade AI to businesses worldwide. Cohere has raised nearly $1 billion across four funding rounds, with a valuation exceeding $6.8 billion and backing from Nvidia and Geoffrey Hinton’s Radical Ventures. Gomez was named to the TIME 100/AI list in 2023 and ranked first on Maclean’s AI Trailblazers Power List. In 2025, he was elected to the board of Rivian. At 28, he has already reshaped the global AI industry while keeping Cohere headquartered in Toronto, strengthening Canada’s position as an AI superpower.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Aidan_Gomez"
  },
  {
    rank: 10,
    name: "Michele Romanow",
    company: "Clearco",
    location: "Toronto, ON",
    peak: "$2.9B valuation",
    description: "Michele Romanow is a serial entrepreneur who founded six companies before her 35th birthday and became the youngest “Dragon” on CBC’s Dragons’ Den in 2015. Born in Regina, Saskatchewan, she studied civil engineering and earned her MBA at Queen’s University, where she founded Canada’s first zero-consumer-waste coffee shop. She co-founded Buytopia.ca and SnapSaves (acquired by Groupon), and later Clearco (formerly Clearbanc), which became the world’s largest e-commerce investor, deploying over $5 billion into 10,000+ entrepreneurs across 13 countries. Clearco reached unicorn status in 2021, becoming one of only 23 fintech unicorns worldwide co-founded by a woman. She was named to Fortune’s 40 under 40, the World Economic Forum’s Young Global Leaders, WXN’s 100 Most Powerful Women in Canada, and won the Canadian Innovation Award for Angel Investor of the Year in 2018. Romanow pioneered revenue-based financing and funded 25 times more women-led businesses than the venture capital industry average.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Michele_Romanow"
  },
  {
    rank: 11,
    name: "Jozef Straus",
    company: "JDS Fitel / JDS Uniphase",
    location: "Ottawa, ON",
    peak: "$314.5B adjusted peak",
    description: "Jozef Straus co-founded JDS Fitel, a fiber optics company that merged with Uniphase in 1999 to form JDS Uniphase (JDSU). At the height of the dot-com boom, JDSU briefly became one of the most valuable companies in the world, with a market capitalization exceeding $300 billion (adjusted to 2025 CAD), making it by far the largest Canadian tech company by market cap at the time. The company was the dominant supplier of fiber-optic components that powered the global telecommunications buildout of the late 1990s. Though the stock crashed with the telecom bubble in 2001, Straus’s work helped establish Canada as a global leader in photonics and fiber-optic technology, creating an entire industry cluster in Ottawa.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/JDSU"
  },
  {
    rank: 12,
    name: "Carl Hansen",
    company: "AbCellera Biologics",
    location: "Vancouver, BC",
    peak: "$15.7B market cap",
    description: "Carl Hansen founded AbCellera Biologics in 2012 as a spin-out from his lab at the University of British Columbia. The company uses AI and microfluidics technology to discover antibodies for drug development, and rose to global prominence during the COVID-19 pandemic when it helped discover bamlanivimab, one of the first monoclonal antibody treatments for COVID-19, in partnership with Eli Lilly. AbCellera went public in late 2020 and its market cap peaked at nearly $16 billion. Hansen, a professor of engineering at UBC, holds a PhD from the California Institute of Technology. AbCellera’s technology platform has powered partnerships with over 50 pharmaceutical companies, positioning Vancouver as a biotech hub. Hansen represents the intersection of academic excellence and entrepreneurial ambition that defines Canada’s best biotech founders.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/AbCellera_Biologics"
  },
  {
    rank: 13,
    name: "Roham Gharegozlou",
    company: "Dapper Labs",
    location: "Vancouver, BC",
    peak: "$11.2B valuation",
    description: "Roham Gharegozlou co-founded Dapper Labs in 2018, the company behind CryptoKitties, one of the first mainstream blockchain applications, and NBA Top Shot, a digital collectibles platform that generated over $1 billion in sales. Under his leadership, Dapper Labs raised over $600 million in funding and reached a valuation of $7.6 billion, making it one of the most valuable Web3 companies globally. Gharegozlou, who holds a degree in economics from Stanford and grew up in Vancouver, also spearheaded the development of the Flow blockchain, a purpose-built blockchain designed for consumer-scale applications. His work helped bring blockchain technology to mainstream consumers and attracted partnerships with major sports leagues and entertainment brands. Dapper Labs put Vancouver on the map as a leading hub for Web3 innovation.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Dapper_Labs"
  },
  {
    rank: 14,
    name: "Michael Katchen",
    company: "Wealthsimple",
    location: "Toronto, ON",
    peak: "$5.9B valuation",
    description: "Michael Katchen founded Wealthsimple in 2014 with a mission to democratize investing for a new generation of Canadians. The company started as a robo-advisor and has expanded into a comprehensive financial platform offering trading, tax filing, crypto, and peer-to-peer payments. Wealthsimple has grown to manage billions in assets and serve over a million clients, becoming Canada’s most popular online investing platform. In 2021, the company raised at a valuation of approximately $5 billion, backed by prominent investors including Power Corporation’s Portag3 Ventures and celebrity supporters like Drake and Ryan Reynolds. Katchen, who previously worked at Ancestry.com in Silicon Valley, deliberately chose to build in Toronto to prove that world-class fintech companies can thrive in Canada. He has been recognized on Forbes 30 Under 30 and has become one of Canada’s most visible champions for financial literacy and innovation.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Wealthsimple"
  },
  {
    rank: 15,
    name: "Dave Teare",
    company: "1Password",
    location: "Toronto, ON",
    peak: "$10B valuation",
    description: "Dave Teare co-founded 1Password (originally AgileBits) in 2005 with Roustem Karimov, building it into the world’s most trusted password manager. For over a decade, 1Password was entirely bootstrapped and profitable before accepting its first external investment in 2019. In 2022, the company raised $620 million at a valuation of approximately $6.8 billion, making it one of the largest funding rounds in Canadian tech history. 1Password serves over 100,000 businesses and millions of individual users, securing credentials for some of the most high-profile organizations in the world. Teare’s patient approach to company-building, prioritizing product quality and customer trust over rapid growth, distinguishes him as a model for sustainable tech entrepreneurship in Canada. The company’s commitment to remaining headquartered in Toronto has made it a magnet for cybersecurity talent in the region.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/1Password"
  },
  {
    rank: 16,
    name: "Neil Cawse",
    company: "Geotab",
    location: "Oakville, ON",
    peak: "$5B valuation",
    description: "Neil Cawse founded Geotab in 2000 and built it into the world’s leading connected vehicle and fleet management platform, entirely self-funded. With over 4 million connected vehicles and processing over 75 billion data points daily, Geotab serves customers in over 160 countries. The company reached a valuation of approximately $5 billion without ever taking external venture capital, making it one of the most remarkable bootstrapped success stories in Canadian technology. Cawse, an engineer by training, has maintained a relentless focus on data analytics and open-platform architecture, enabling integrations with thousands of third-party solutions. Geotab’s technology supports electric vehicle fleet management, road safety analytics, and sustainability initiatives. Cawse exemplifies the quiet, engineering-driven founder who builds enduring companies through product excellence rather than hype.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Geotab"
  },
  {
    rank: 17,
    name: "Frederic Lalonde",
    company: "Hopper",
    location: "Montréal, QC",
    peak: "$7.4B valuation",
    description: "Frederic Lalonde co-founded Hopper in 2007, creating an AI-powered travel booking platform that uses predictive analytics to help consumers find the best deals on flights, hotels, and car rentals. The app has been downloaded over 100 million times and consistently ranks among the most popular travel apps globally. Hopper reached a valuation of approximately $5 billion and has expanded into B2B travel technology through its Hopper Technology Solutions division, which powers booking and fintech products for airlines, hotels, and travel agencies worldwide. A graduate of the Université de Montréal, Lalonde previously founded a startup acquired by Expedia before launching Hopper. His company has raised over $700 million and established Montréal as a significant hub for AI-powered travel technology. Lalonde is known for his data-first approach and has built one of the few Canadian consumer tech companies with true global scale.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Hopper_(company)"
  },
  {
    rank: 18,
    name: "Martin, Meti & Massi Basiri",
    company: "ApplyBoard",
    location: "Kitchener, ON",
    peak: "$4B valuation",
    description: "The three Basiri brothers, Martin, Meti, and Massi, fled Iran and arrived in Canada as international students. Drawing on their own challenges navigating the admissions process, they founded ApplyBoard in 2015 to simplify international student recruitment. The platform connects students from over 150 countries to 1,800+ educational institutions in Canada, the US, the UK, Australia, and Ireland. ApplyBoard reached unicorn status in 2021 with a $4 billion valuation, making it one of the most valuable edtech companies in North America. The Basiri brothers’ immigrant story and their mission to make education accessible have resonated globally. ApplyBoard has helped over a million students explore educational opportunities and has become a powerful symbol of how Canada’s openness to immigrants fuels innovation and entrepreneurship.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/ApplyBoard"
  },
  {
    rank: 19,
    name: "Jack Newton",
    company: "Clio",
    location: "Vancouver, BC (Burnaby)",
    peak: "$4.6B valuation",
    description: "Jack Newton co-founded Clio in 2008 with Rian Gauvreau, creating the world’s leading cloud-based legal practice management platform. Clio serves over 150,000 legal professionals in more than 130 countries, transforming how law firms manage cases, billing, and client relationships. The company has raised over $400 million and reached a valuation of $4.6 billion, making it one of BC’s most valuable private tech companies. Newton is also the author of The Client-Centered Law Firm, a bestselling book on modernizing legal practice. Under his leadership, Clio has become the de facto standard for legal technology, pioneering the shift to cloud-based practice management in an industry historically resistant to change. Newton’s advocacy for access to justice and his annual Clio Cloud Conference have made him one of the most influential voices in legal tech globally.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Clio_(software)"
  },
  {
    rank: 20,
    name: "Raquel Urtasun",
    company: "Waabi",
    location: "Toronto, ON",
    peak: "$4.5B valuation",
    description: "Raquel Urtasun is a globally renowned AI researcher and the founder of Waabi, a Toronto-based autonomous driving company that uses generative AI to develop self-driving truck technology. Before founding Waabi in 2021, she served as Chief Scientist at Uber ATG (Advanced Technologies Group) and is a professor of computer science at the University of Toronto and a co-founder of the Vector Institute for Artificial Intelligence. Urtasun has published over 200 research papers and is one of the most cited researchers in computer vision and machine learning. Waabi raised $200 million in its initial funding round at a $4.5 billion valuation, reflecting extraordinary investor confidence in her technical vision. Her approach of using AI-first simulation to train autonomous vehicles rather than relying on billions of miles of real-world driving data represents a paradigm shift in the industry. Urtasun is frequently cited as one of the most influential women in AI globally.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Raquel_Urtasun"
  }
];

export default function GoatFounders() {
  return (
    <div className="animate-in">
      <section className="section">
        <div className="section-header">
          <h2>GOAT Founders</h2>
          <div className="divider" />
          <p>The Greatest Of All Time: Architects of Canada's tech legacy.</p>
          <p style={{ 
            fontSize: "0.85rem", 
            color: "var(--gold)", 
            opacity: 0.9, 
            marginTop: "0.75rem", 
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)" }}></span>
            Values are inflation-adjusted peak valuation
          </p>
        </div>

        <div style={{ display: "grid", gap: "2rem" }}>
          {FOUNDERS.map((f) => (
            <div key={f.rank} className="card" style={{ padding: "2.5rem", position: "relative", overflow: "hidden" }}>
              {/* Background Rank */}
              <div style={{
                position: "absolute",
                right: "-20px",
                top: "-20px",
                fontSize: "12rem",
                fontWeight: 900,
                color: "var(--navy)",
                opacity: 0.03,
                fontFamily: "'Playfair Display'",
                pointerEvents: "none"
              }}>
                {f.rank}
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <div style={{ 
                      fontSize: "0.85rem", 
                      fontWeight: 700, 
                      color: "var(--gold)", 
                      textTransform: "uppercase", 
                      letterSpacing: "0.1em",
                      marginBottom: "0.5rem",
                      fontFamily: "'Roboto Mono'"
                    }}>
                      Founder Rank #{f.rank}
                    </div>
                    <h3 style={{ 
                      fontSize: "2.5rem", 
                      fontFamily: "'Playfair Display', serif", 
                      color: "var(--navy)",
                      margin: 0
                    }}>
                      <a 
                        href={f.wikipediaUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="founder-link"
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                          transition: "color 0.2s ease"
                        }}
                      >
                        {f.name}
                      </a>
                    </h3>
                  </div>
                  
                  <div style={{ textAlign: "right" }}>
                    <div style={{ 
                      fontSize: "1.25rem", 
                      fontWeight: 700, 
                      color: "var(--navy)",
                      fontFamily: "'Roboto Mono'",
                      marginBottom: "0.25rem"
                    }}>
                      {f.peak}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                      {f.company}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  display: "flex", 
                  gap: "2rem", 
                  marginBottom: "2rem", 
                  padding: "1rem 0", 
                  borderTop: "1px solid var(--border-light)",
                  borderBottom: "1px solid var(--border-light)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--slate-light)", textTransform: "uppercase" }}>Location:</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--navy)" }}>{f.location}</span>
                  </div>
                </div>

                <div style={{ 
                  fontSize: "1.05rem", 
                  lineHeight: 1.7, 
                  color: "var(--text-secondary)",
                  fontFamily: "'Inter', sans-serif",
                  maxWidth: "900px"
                }}>
                  {f.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: "4rem", 
          padding: "3rem", 
          background: "var(--navy)", 
          borderRadius: "12px", 
          color: "white" 
        }}>
          <h3 style={{ fontFamily: "'Playfair Display'", fontSize: "2rem", marginBottom: "1.5rem" }}>Methodology & Notes</h3>
          <p style={{ opacity: 0.8, lineHeight: 1.6, fontSize: "1rem", maxWidth: "1000px" }}>
            This ranking draws from the Canadian Unicorn Dataset, which tracks over 100 Canadian technology companies that reached or exceeded $1 billion in peak valuation (adjusted to 2025 CAD). Founders were evaluated on multiple dimensions including: peak company valuation as a proxy for scale of impact; the founder’s personal role in building the enterprise; breadth of innovation and industry influence; contributions to Canada’s technology ecosystem through mentorship, investment, or institution-building; and recognition through major awards, honours, and philanthropy.
          </p>
          <p style={{ opacity: 0.8, lineHeight: 1.6, fontSize: "1rem", maxWidth: "1000px", marginTop: "1rem" }}>
            Note: Some founders on this list, such as Tobias Lütke (born in Germany) and Terry Matthews (born in Wales), built their companies in Canada and are central figures in the Canadian tech ecosystem, even if they were not born in Canada. Their inclusion reflects their status as Canadian founders by adoption and impact.
          </p>
        </div>
      </section>
    </div>
  );
}
