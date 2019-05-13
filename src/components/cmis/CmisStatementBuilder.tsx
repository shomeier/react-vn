
export class CmisStatementBuilder {

    public static buildCmisStatement(statement: string, filters: any, sortyBy: string): string {

        let replaced = statement;
        let filter = "";
        if (filters) {
            for (let key in filters) {
                if (filters[key].length > 0)
                    filter += key + " LIKE '" + filters[key] + "%'";
            }
        }

        if (filter.length > 0) {
            // const test = "SELECT lingo:text, cmis:name FROM lingo:text ORDER BY lingo:text";
            let selectFromRegEx = /(SELECT\s*(\w*:\w*)(,\s*\w*:\w*)*\s*FROM\s*(\w*:\w*))/gi
            // let orderByRegEx = /(ORDER BY\s*(\w*:\w*))/gi
            replaced = statement.replace(selectFromRegEx, "$1 WHERE " + filter);
            console.log("Replaced: " + replaced)
        }

        // return replaced 
        return replaced
    }
}