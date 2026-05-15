import React, { useState } from 'react';

//   return (
//     <div style={styles.container}>
//       <h2>Product Search</h2>

//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search fruits..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={styles.input}
//       />

//       {/* Results List */}
//       <ul style={styles.list}>
//         {filteredItems.length > 0 ? (
//           filteredItems.map((item, index) => (
//             <li key={index} style={styles.listItem}>
//               {item}
//             </li>
//           ))
//         ) : (
//           <li style={styles.noResults}>No matches found</li>
//         )}
//       </ul>
//     </div>
//   );
// };


const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'lightgrey, solid 1px',
    padding: '20px',
    marginRight: '30px',
    minWidth: '400px',
    minHeight: '600px'
}


export function Filter() {

    const options = ['XXX', 'YYY', 'ZZZ', 'WWW'];

    return (
        <section style={styles}>
            <ul>
                {options.length > 0 ? (
                    options.map((item, index) => (
                        <li key={index} >
                            {item}
                        </li>
                    ))
                ) : (
                    <li>No matches found</li>
                )}
            </ul>
        </section>
    );
}