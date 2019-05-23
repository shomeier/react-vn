
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
            let columnSelectorPart = "((\\w*\\.)?\\w*:\\w*)"
            let selectPart = "SELECT\\s*" + columnSelectorPart + "(,\\s*" + columnSelectorPart + ")*\\s*"
            let fromPart = "FROM\\s*" + columnSelectorPart + "(\\s*AS\\s*\\w*)*\\s*"
            let joinPart = "JOIN\\s*" + columnSelectorPart + "\\s*AS\\s*\\w*\\s*ON\\s*" + columnSelectorPart + "\\s*=\\s*" + columnSelectorPart + "\\s*"
            let wherePart = "WHERE\\s*ANY\\s*(\\w*:\\w*)\\s*IN\\s*\\('.*'\\)"
            let selectFromRegExString = "(" + selectPart + fromPart + joinPart + wherePart + ")"

            let regEx = new RegExp(selectFromRegExString, "gi")

            replaced = statement.replace(regEx, "$1 AND " + filter);
            console.log("Replaced: " + replaced)
        }

        // return replaced 
        return replaced
    }
}