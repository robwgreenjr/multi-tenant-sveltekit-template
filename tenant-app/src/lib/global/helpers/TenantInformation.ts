import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import {HttpMethod} from "$lib/global/enums/HttpMethod";

export const getTenantId = async (url: URL) => {
    let tenantId = null;
    const findSubdomain = url.host.split(".");
    if (findSubdomain.length >= 3) {
        const subdomain = findSubdomain[findSubdomain.length - 3];

        const tenantResponse = await fetchRequest({
            url: `${serverVariable.serverPath}authentication/confirm`,
            method: HttpMethod.POST,
            body: {
                subdomain
            },
        });

        if (!tenantResponse.errors.length) {
            tenantId = tenantResponse.data[0].tenantId;
        }
    }

    return tenantId;
}