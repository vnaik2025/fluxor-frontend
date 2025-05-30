// import React, { useState, useMemo, useEffect } from "react";
// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "../../../common/tabs/Tabs";
// import Input from "../../../controls/input/inputView";
// import Select from "../../../controls/selection/selection";
// import Textarea from "../../../controls/textarea/Textarea";
// import FileUpload from "../../../controls/fileUpload/fileUpload";
// import DateTimePicker from "../../../controls/datetimePicker/DateTimePicker";
// import AdPreview from "../../../common/adPreview/adPreview";
// import { ChevronDown, ChevronUp, Plus, Trash2, Eye } from "lucide-react";
// import Button from "../../../controls/button/buttonView";
// import TopNavbar from "../../../common/topNavbar/topNavbar";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "../../../common/card/Card";
// import Modal from "../../../common/modal/modal";
// import ReusableDataTable from "../../../common/DataTable/DataTable";

// const defaultAudience = {
//   geo: [],
//   device: [],
//   interests: [],
//   age_range: [],
// };

// const defaultSchedule = {
//   start: "",
//   end: "",
//   timezone: "UTC",
// };

// const defaultDimensions = {
//   width: 0,
//   height: 0,
//   unit: "px",
// };

// const defaultCustomContent = {
//   html: "",
//   css: "",
//   js: "",
//   image_url: "",
//   youtube_url: "",
//   text: "",
//   content_type: "url",
// };

// const normalizeAdData = (ad) => ({
//   id: ad.id || null,
//   name: ad.name || "",
//   code: ad.code || "",
//   ad_type: ad.ad_type || "banner",
//   placement: ad.placement || "header",
//   custom_content: { ...defaultCustomContent, ...ad.custom_content },
//   dimensions: { ...defaultDimensions, ...ad.dimensions },
//   is_active: ad.is_active ?? true,
//   target_pages: {
//     match_type: ad.target_pages?.match_type || "exact",
//     paths: Array.isArray(ad.target_pages?.paths) ? ad.target_pages.paths : [],
//   },
//   target_audience: { ...defaultAudience, ...ad.target_audience },
//   schedule: { ...defaultSchedule, ...ad.schedule },
//   priority: ad.priority || 0,
//   status: ad.status || (ad.is_active ? "active" : "paused"),
//   file: null,
// });

// const matchTypeOptions = [
//   { value: "exact", label: "Exact Match" },
//   { value: "prefix", label: "Starts With" },
//   { value: "regex", label: "Regex Match" },
// ];

// const deviceOptions = ["Mobile", "Desktop", "Tablet"].map((d) => ({
//   label: d,
//   value: d.toLowerCase(),
// }));
// const ageRangeOptions = ["18-24", "25-34", "35-44", "45-54", "55+"].map(
//   (r) => ({
//     label: r,
//     value: r,
//   })
// );
// const interestOptions = ["Tech", "Finance", "Travel", "Fitness", "Gaming"].map(
//   (i) => ({
//     label: i,
//     value: i.toLowerCase(),
//   })
// );
// const geoOptions = ["US", "UK", "CA", "IN", "AU"].map((g) => ({
//   label: g,
//   value: g,
// }));

// const contentTypeOptions = {
//   banner: [
//     { value: "url", label: "Image URL" },
//     { value: "custom_image", label: "Upload Image" },
//   ],
//   video: [
//     { value: "url", label: "YouTube URL" },
//     { value: "custom_video", label: "Upload Video" },
//   ],
//   native: [{ value: "text", label: "Text Content" }],
//   custom: [{ value: "code", label: "Custom Code" }],
// };

// const densityOptions = [
//   { value: "low", label: "Low" },
//   { value: "balanced", label: "Balanced" },
//   { value: "high", label: "High" },
// ];

// const formatOptions = [
//   { value: "banner", label: "Banner" },
//   { value: "responsive", label: "Responsive" },
//   { value: "native", label: "Native" },
// ];

// const pageOptions = [
//   { value: "all", label: "All Pages" },
//   { value: "home", label: "Home Page" },
//   { value: "posts", label: "Blog Posts" },
//   { value: "custom", label: "Custom" },
// ];

// const statusOptions = [
//   { value: "all", label: "All Status" },
//   { value: "active", label: "Active" },
//   { value: "paused", label: "Paused" },
//   { value: "archived", label: "Archived" },
// ];

// const AdSenseManagerView = ({
//   publisherId,
//   adClient,
//   placements,
//   adDensity,
//   adFormat,
//   targetPages,
//   adUnits,
//   loading,
//   error,
//   onUpdatePlacement,
//   onAddCustomAd,
//   onUpdateCustomAd,
//   onDeleteAdUnit,
//   onSaveAdSettings,
// }) => {
//   const [editingAd, setEditingAd] = useState(null);
//   const [previewAd, setPreviewAd] = useState(null);
//   const [activeTab, setActiveTab] = useState("configuration");
//   const [formData, setFormData] = useState(normalizeAdData({}));
//   const [errors, setErrors] = useState({});
//   const [configErrors, setConfigErrors] = useState({});
//   const [expandedSections, setExpandedSections] = useState({
//     general: true,
//     content: true,
//     targeting: true,
//     schedule: true,
//   });
//   const [localPublisherId, setLocalPublisherId] = useState(publisherId || "");
//   const [localAdClient, setLocalAdClient] = useState(adClient || "");
//   const [localAdDensity, setLocalAdDensity] = useState(adDensity || "balanced");
//   const [localAdFormat, setLocalAdFormat] = useState(adFormat || "responsive");
//   const [localTargetPages, setLocalTargetPages] = useState(
//     targetPages || "all"
//   );
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const defaultAd = useMemo(
//     () => ({
//       name: "",
//       code: "",
//       ad_type: "banner",
//       placement: "header",
//       custom_content: defaultCustomContent,
//       dimensions: defaultDimensions,
//       is_active: true,
//       target_pages: { match_type: "exact", paths: [] },
//       target_audience: defaultAudience,
//       schedule: defaultSchedule,
//       priority: 0,
//     }),
//     []
//   );

//   useEffect(() => {
//     setLocalPublisherId(publisherId || "");
//     setLocalAdClient(adClient || "");
//     setLocalAdDensity(adDensity || "balanced");
//     setLocalAdFormat(adFormat || "responsive");
//     setLocalTargetPages(targetPages || "all");
//     setConfigErrors({});
//   }, [publisherId, adClient, adDensity, adFormat, targetPages]);

//   useEffect(() => {
//     console.log("formData updated:", formData);
//   }, [formData]);

//   const handleTabChange = (newTab) => {
//     setActiveTab(newTab);
//     if (newTab !== "create") {
//       setEditingAd(null);
//       setFormData(normalizeAdData({}));
//     } else {
//       setFormData(
//         editingAd ? normalizeAdData(editingAd) : normalizeAdData(defaultAd)
//       );
//     }
//   };

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     setErrors((prev) => ({ ...prev, [field]: null }));
//   };

//   const handleNestedChange = (group, key, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [group]: { ...prev[group], [key]: value },
//     }));
//     setErrors((prev) => ({ ...prev, [group]: null }));
//   };

//   const handleCustomContentChange = (key, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       custom_content: { ...prev.custom_content, [key]: value },
//     }));
//     setErrors((prev) => ({ ...prev, custom_content: null }));
//   };

//   const handleFileChange = (file) => {
//     console.log("Selected file:", file);
//     setFormData((prev) => ({
//       ...prev,
//       file: file,
//       custom_content: {
//         ...prev.custom_content,
//         image_url:
//           file && formData.ad_type === "banner"
//             ? URL.createObjectURL(file)
//             : prev.custom_content.image_url,
//         youtube_url:
//           file && formData.ad_type === "video"
//             ? URL.createObjectURL(file)
//             : prev.custom_content.youtube_url,
//       },
//     }));
//     setErrors((prev) => ({ ...prev, file: null }));
//   };

//   const validateConfiguration = () => {
//     const newErrors = {};
//     if (!localPublisherId) newErrors.publisherId = "Publisher ID is required";
//     if (!localAdClient) newErrors.adClient = "Ad Client is required";
//     if (!localAdDensity) newErrors.adDensity = "Ad density is required";
//     if (!["low", "balanced", "high"].includes(localAdDensity)) {
//       newErrors.adDensity = "Ad density must be low, balanced, or high";
//     }
//     if (!localAdFormat) newErrors.adFormat = "Ad format is required";
//     if (!localTargetPages) newErrors.targetPages = "Target pages is required";
//     setConfigErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSaveAd = (e) => {
//     e.preventDefault();

//     // Validation
//     const newErrors = {};
//     if (!formData.name) newErrors.name = "Ad name is required";
//     if (!formData.code) newErrors.code = "Ad code is required";
//     if (
//       formData.custom_content.content_type === "custom_image" &&
//       !formData.file
//     ) {
//       newErrors.file = "Image file is required for custom image";
//     }
//     if (
//       formData.custom_content.content_type === "custom_video" &&
//       !formData.file
//     ) {
//       newErrors.file = "Video file is required for custom video";
//     }
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) {
//       console.error("Validation errors:", newErrors);
//       return;
//     }

//     // Prepare the ad data
//     const dataToSend = {
//       name: formData.name,
//       code: formData.code,
//       ad_type: formData.ad_type,
//       placement: formData.placement,
//       dimensions: formData.dimensions,
//       is_active: formData.is_active,
//       target_pages: formData.target_pages,
//       target_audience: formData.target_audience,
//       schedule: formData.schedule,
//       priority: formData.priority,
//       status: formData.is_active ? "active" : "paused",
//       custom_content: {
//         ...formData.custom_content,
//         image_url: "", // Clear blob URL
//         youtube_url: "", // Clear blob URL
//       },
//     };

//     // Handle FormData for file uploads
//     if (formData.file) {
//       console.log("Preparing FormData with file:", formData.file);
//       const formDataToSend = new FormData();
//       formDataToSend.append("file", formData.file);
//       formDataToSend.append("data", JSON.stringify(dataToSend));

//       // Debug FormData contents
//       for (const [key, value] of formDataToSend.entries()) {
//         console.log(`FormData entry in handleSaveAd - ${key}:`, value);
//       }

//       editingAd
//         ? onUpdateCustomAd({ id: formData.id, data: formDataToSend })
//         : onAddCustomAd(formDataToSend);
//     } else {
//       console.log("Sending JSON data:", dataToSend);
//       // Only allow JSON payload for non-file content types
//       if (
//         formData.custom_content.content_type !== "custom_image" &&
//         formData.custom_content.content_type !== "custom_video"
//       ) {
//         editingAd
//           ? onUpdateCustomAd({ id: formData.id, data: dataToSend })
//           : onAddCustomAd(dataToSend);
//       } else {
//         console.error(
//           "Cannot create ad without file for custom_image or custom_video"
//         );
//         setErrors({ file: "File is required for this content type" });
//         return;
//       }
//     }

//     // Reset form
//     setEditingAd(null);
//     setFormData(normalizeAdData(defaultAd));
//     setActiveTab("custom");
//     setErrors({});
//   };

//   const handleOpenPreview = (ad) => {
//     setPreviewAd(ad);
//   };

//   const handleClosePreview = () => {
//     setPreviewAd(null);
//   };

//   const handleEditAd = (ad) => {
//     setEditingAd(ad);
//     setFormData(normalizeAdData(ad));
//     setActiveTab("create");
//   };

//   const handleAddCustomAd = () => {
//     setEditingAd(null);
//     setFormData(normalizeAdData(defaultAd));
//     setActiveTab("create");
//   };

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   const sampleUserData = {
//     name: "John Doe",
//     email: "john@example.com",
//   };

//   const handleSearch = (query) => {
//     console.log("Search query:", query);
//   };

//   const handleSaveConfiguration = () => {
//     if (!validateConfiguration()) return;
//     onSaveAdSettings({
//       publisher_id: localPublisherId,
//       ad_client: localAdClient,
//       ad_density: localAdDensity,
//       ad_format: localAdFormat,
//       target_pages: localTargetPages,
//     });
//   };

//   const columns = useMemo(
//     () => [
//       {
//         name: "Name",
//         selector: (row) => row.name,
//         sortable: true,
//       },
//       {
//         name: "Type",
//         selector: (row) => row.ad_type,
//         sortable: true,
//       },
//       {
//         name: "Placement",
//         selector: (row) => row.placement,
//         sortable: true,
//       },
//       {
//         name: "Priority",
//         selector: (row) => row.priority,
//         sortable: true,
//       },
//       {
//         name: "Status",
//         selector: (row) => row.status,
//         sortable: true,
//         cell: (row) => (
//           <span
//             className={`capitalize px-2 py-1 rounded-full text-xs ${
//               row.status === "active"
//                 ? "bg-green-100 text-green-800"
//                 : row.status === "paused"
//                 ? "bg-yellow-100 text-yellow-800"
//                 : "bg-gray-100 text-gray-800"
//             }`}
//           >
//             {row.status}
//           </span>
//         ),
//       },
//       {
//         name: "Actions",
//         cell: (row) => (
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               onClick={() => handleEditAd(row)}
//               className="border-gray-300 dark:border-gray-600 dark:text-gray-100 text-xs px-2 py-1"
//             >
//               Edit
//             </Button>
//             <Button
//               variant="outline"
//               onClick={() => onDeleteAdUnit(row.id)}
//               className="border-gray-300 dark:border-gray-600 dark:text-gray-100 text-xs px-2 py-1"
//             >
//               <Trash2 className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               onClick={() => handleOpenPreview(row)}
//               className="border-gray-300 dark:border-gray-600 dark:text-gray-100 text-xs px-2 py-1"
//             >
//               <Eye className="h-4 w-4" />
//             </Button>
//           </div>
//         ),
//         ignoreRowClick: true,
//         allowOverflow: true,
//         button: true,
//       },
//     ],
//     []
//   );

//   const filteredAdUnits = useMemo(() => {
//     if (statusFilter === "all") return adUnits;
//     return adUnits?.filter((ad) => ad.status === statusFilter);
//   }, [adUnits, statusFilter]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-0 py-0 space-y-6">
//       <div className="flex-1 flex flex-col">
//         <TopNavbar
//           userData={sampleUserData}
//           onSearch={handleSearch}
//           notificationCount={3}
//           toggleSidebar={() => console.log("Sidebar toggled")}
//         />

//         <main className="flex-1 w-full mx-auto px-6 py-3 space-y-8">
//           <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
//             Ad Management
//           </h1>
//           <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
//             Configure and optimize your ad units to maximize revenue while
//             maintaining user experience.
//           </p>

//           {error && (
//             <div
//               className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//               role="alert"
//             >
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}

//           {!loading && (
//             <Tabs
//               value={activeTab}
//               onValueChange={handleTabChange}
//               className="space-y-4"
//             >
//               <TabsList className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 w-full">
//                 <TabsTrigger
//                   value="configuration"
//                   className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
//                 >
//                   Configuration
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="custom"
//                   className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
//                 >
//                   Custom Ads
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="create"
//                   className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
//                 >
//                   Create Ad
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="configuration" className="mt-6 space-y-6">
//                 <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                   <CardHeader>
//                     <CardTitle className="text-lg sm:text-xl">
//                       Ad Configuration
//                     </CardTitle>
//                     <p className="text-sm text-gray-600 dark:text-gray-300">
//                       Configure your AdSense account and global ad settings.
//                     </p>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     <div className="space-y-4">
//                       <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
//                         AdSense Account
//                       </h3>
//                       <Input
//                         label="Publisher ID"
//                         value={localPublisherId}
//                         onChange={(e) => setLocalPublisherId(e.target.value)}
//                         placeholder="e.g., pub-1234567890123456"
//                         className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                         error={configErrors.publisherId}
//                       />
//                       <Input
//                         label="Ad Client"
//                         value={localAdClient}
//                         onChange={(e) => setLocalAdClient(e.target.value)}
//                         placeholder="e.g., ca-pub-1234567890123456"
//                         className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                         error={configErrors.adClient}
//                       />
//                     </div>
//                     <div className="space-y-4">
//                       <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
//                         Global Ad Settings
//                       </h3>
//                       <div className="space-y-2">
//                         <Select
//                           label="Ad Density"
//                           options={densityOptions}
//                           value={localAdDensity}
//                           onChange={(value) => setLocalAdDensity(value)}
//                           className="dark:bg-gray-700 dark:text-gray-100"
//                           error={configErrors.adDensity}
//                         />
//                         <p className="text-xs text-gray-600 dark:text-gray-300">
//                           Controls how many ads are shown throughout your blog.
//                         </p>
//                       </div>
//                       <Select
//                         label="Preferred Ad Format"
//                         options={formatOptions}
//                         value={localAdFormat}
//                         onChange={(value) => setLocalAdFormat(value)}
//                         className="dark:bg-gray-700 dark:text-gray-100"
//                         error={configErrors.adFormat}
//                       />
//                       <Select
//                         label="Pages to Show Ads"
//                         options={pageOptions}
//                         value={localTargetPages}
//                         onChange={(value) => setLocalTargetPages(value)}
//                         className="dark:bg-gray-700 dark:text-gray-100"
//                         error={configErrors.targetPages}
//                       />
//                     </div>
//                     <Button
//                       onClick={handleSaveConfiguration}
//                       variant="outline"
//                       className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
//                     >
//                       Save Configuration
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="custom" className="mt-6">
//                 <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                   <CardHeader>
//                     <CardTitle className="text-lg sm:text-xl">
//                       Custom Advertisements
//                     </CardTitle>
//                     <p className="text-sm text-gray-600 dark:text-gray-300">
//                       Manage direct advertiser relationships and custom ad
//                       banners.
//                     </p>
//                   </CardHeader>
//                   <CardContent>
//                     {adUnits?.length === 0 ? (
//                       <div className="text-center py-6 space-y-4">
//                         <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
//                           No custom ads configured
//                         </h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">
//                           Create custom ad units for direct advertisers or
//                           promotional content.
//                         </p>
//                         <Button
//                           onClick={handleAddCustomAd}
//                           variant="outline"
//                           className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
//                         >
//                           <Plus className="h-4 w-4 mr-2" />
//                           Add Custom Ad
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <div className="flex justify-between items-center">
//                           <Select
//                             label="Filter by Status"
//                             options={statusOptions}
//                             value={statusFilter}
//                             onChange={(value) => {
//                               setStatusFilter(value);
//                               setCurrentPage(1);
//                             }}
//                             className="dark:bg-gray-700 dark:text-gray-100 w-48"
//                           />
//                           <Button
//                             onClick={handleAddCustomAd}
//                             variant="outline"
//                             className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
//                           >
//                             <Plus className="h-4 w-4 mr-2" />
//                             Add Custom Ad
//                           </Button>
//                         </div>
//                         <ReusableDataTable
//                           columns={columns}
//                           data={filteredAdUnits || []}
//                           loading={loading}
//                           rowsPerPage={rowsPerPage}
//                           currentPage={currentPage}
//                           onChangePage={handlePageChange}
//                           onRowClick={(row) => handleEditAd(row)}
//                           paginationRowsPerPageOptions={[5, 10, 20, 50]}
//                           loadingMessage="Loading ads..."
//                           noDataMessage="No ads available"
//                           striped={true}
//                           highlightOnHover={true}
//                           noHeader={true}
//                         />
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="create" className="mt-6">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                   <div className="col-span-1 lg:col-span-2 space-y-6">
//                     <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                       <CardHeader>
//                         <CardTitle className="text-lg sm:text-xl">
//                           {editingAd ? "Edit Ad" : "Create New Ad"}
//                         </CardTitle>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">
//                           Configure your custom ad unit with detailed settings
//                           and preview it in real-time.
//                         </p>
//                       </CardHeader>
//                       <CardContent className="space-y-6">
//                         <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                           <CardHeader
//                             className="flex flex-row justify-between items-center cursor-pointer py-3"
//                             onClick={() => toggleSection("general")}
//                           >
//                             <CardTitle className="text-base">
//                               General Settings
//                             </CardTitle>
//                             {expandedSections.general ? (
//                               <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             ) : (
//                               <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             )}
//                           </CardHeader>
//                           {expandedSections.general && (
//                             <CardContent className="space-y-4 pt-4">
//                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <Input
//                                   label="Ad Name"
//                                   value={formData.name}
//                                   onChange={(e) =>
//                                     handleChange("name", e.target.value)
//                                   }
//                                   error={errors.name}
//                                   name="name"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                                 <Input
//                                   label="Ad Code"
//                                   value={formData.code}
//                                   onChange={(e) =>
//                                     handleChange("code", e.target.value)
//                                   }
//                                   error={errors.code}
//                                   name="code"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                                 <Select
//                                   label="Ad Type"
//                                   options={[
//                                     { value: "banner", label: "Banner" },
//                                     { value: "video", label: "Video" },
//                                     { value: "native", label: "Native" },
//                                     { value: "custom", label: "Custom" },
//                                   ]}
//                                   value={formData.ad_type}
//                                   onChange={(value) => {
//                                     handleChange("ad_type", value);
//                                     handleCustomContentChange(
//                                       "content_type",
//                                       contentTypeOptions[value]?.[0]?.value ||
//                                         "url"
//                                     );
//                                   }}
//                                   name="ad_type"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Select
//                                   label="Placement"
//                                   options={[
//                                     { value: "header", label: "Header" },
//                                     { value: "sidebar", label: "Sidebar" },
//                                     {
//                                       value: "in_content",
//                                       label: "In Content",
//                                     },
//                                     { value: "footer", label: "Footer" },
//                                     { value: "custom", label: "Custom" },
//                                   ]}
//                                   value={formData.placement}
//                                   onChange={(value) =>
//                                     handleChange("placement", value)
//                                   }
//                                   name="placement"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Input
//                                   label="Width (px)"
//                                   type="number"
//                                   value={formData.dimensions.width}
//                                   onChange={(e) =>
//                                     handleNestedChange(
//                                       "dimensions",
//                                       "width",
//                                       Number(e.target.value)
//                                     )
//                                   }
//                                   error={errors.dimensions}
//                                   name="dimensions_width"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                                 <Input
//                                   label="Height (px)"
//                                   type="number"
//                                   value={formData.dimensions.height}
//                                   onChange={(e) =>
//                                     handleNestedChange(
//                                       "dimensions",
//                                       "height",
//                                       Number(e.target.value)
//                                     )
//                                   }
//                                   error={errors.dimensions}
//                                   name="dimensions_height"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                                 <Input
//                                   label="Priority"
//                                   type="number"
//                                   value={formData.priority}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       "priority",
//                                       Number(e.target.value)
//                                     )
//                                   }
//                                   name="priority"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                                 <div className="flex items-center gap-2">
//                                   <input
//                                     type="checkbox"
//                                     checked={formData.is_active}
//                                     onChange={(e) =>
//                                       handleChange(
//                                         "is_active",
//                                         e.target.checked
//                                       )
//                                     }
//                                     name="is_active"
//                                     className="dark:bg-gray-700 dark:border-gray-600"
//                                   />
//                                   <label className="text-sm text-gray-700 dark:text-gray-300">
//                                     Active
//                                   </label>
//                                 </div>
//                               </div>
//                             </CardContent>
//                           )}
//                         </Card>

//                         <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                           <CardHeader
//                             className="flex flex-row justify-between items-center cursor-pointer py-3"
//                             onClick={() => toggleSection("content")}
//                           >
//                             <CardTitle className="text-base">
//                               Content Settings
//                             </CardTitle>
//                             {expandedSections.content ? (
//                               <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             ) : (
//                               <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             )}
//                           </CardHeader>
//                           {expandedSections.content && (
//                             <CardContent className="space-y-4 pt-4">
//                               {(formData.ad_type === "banner" ||
//                                 formData.ad_type === "video") && (
//                                 <Select
//                                   label="Content Type"
//                                   options={
//                                     contentTypeOptions[formData.ad_type] || []
//                                   }
//                                   value={formData.custom_content.content_type}
//                                   onChange={(value) => {
//                                     handleCustomContentChange(
//                                       "content_type",
//                                       value
//                                     );
//                                     handleCustomContentChange("image_url", "");
//                                     handleCustomContentChange(
//                                       "youtube_url",
//                                       ""
//                                     );
//                                     handleChange("file", null);
//                                   }}
//                                   name="content_type"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                               )}
//                               {formData.ad_type === "banner" &&
//                                 formData.custom_content.content_type ===
//                                   "url" && (
//                                   <Input
//                                     label="Image URL"
//                                     value={formData.custom_content.image_url}
//                                     onChange={(e) =>
//                                       handleCustomContentChange(
//                                         "image_url",
//                                         e.target.value
//                                       )
//                                     }
//                                     error={errors.image_url}
//                                     name="image_url"
//                                     className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                   />
//                                 )}
//                               {formData.ad_type === "banner" &&
//                                 formData.custom_content.content_type ===
//                                   "custom_image" && (
//                                   <FileUpload
//                                     label="Upload Image"
//                                     value={formData.file}
//                                     onChange={handleFileChange}
//                                     accept="image/*"
//                                     preview={true}
//                                     error={errors.file}
//                                     name="file"
//                                     className="dark:bg-gray-700 dark:text-gray-100"
//                                   />
//                                 )}
//                               {formData.ad_type === "video" &&
//                                 formData.custom_content.content_type ===
//                                   "url" && (
//                                   <Input
//                                     label="YouTube URL"
//                                     value={formData.custom_content.youtube_url}
//                                     onChange={(e) =>
//                                       handleCustomContentChange(
//                                         "youtube_url",
//                                         e.target.value
//                                       )
//                                     }
//                                     error={errors.youtube_url}
//                                     name="youtube_url"
//                                     className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                   />
//                                 )}
//                               {formData.ad_type === "video" &&
//                                 formData.custom_content.content_type ===
//                                   "custom_video" && (
//                                   <FileUpload
//                                     label="Upload Video"
//                                     value={formData.file}
//                                     onChange={handleFileChange}
//                                     accept="video/*"
//                                     preview={true}
//                                     error={errors.file}
//                                     name="file"
//                                     className="dark:bg-gray-700 dark:text-gray-100"
//                                   />
//                                 )}
//                               {formData.ad_type === "native" && (
//                                 <Textarea
//                                   label="Native Ad Text"
//                                   value={formData.custom_content.text}
//                                   onChange={(e) =>
//                                     handleCustomContentChange(
//                                       "text",
//                                       e.target.value
//                                     )
//                                   }
//                                   error={errors.custom_content}
//                                   name="text"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                               )}
//                               {formData.ad_type === "custom" && (
//                                 <div className="space-y-4">
//                                   <Textarea
//                                     label="HTML"
//                                     value={formData.custom_content.html}
//                                     onChange={(e) =>
//                                       handleCustomContentChange(
//                                         "html",
//                                         e.target.value
//                                       )
//                                     }
//                                     error={errors.custom_content}
//                                     name="html"
//                                     className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[100px]"
//                                   />
//                                   <Textarea
//                                     label="CSS"
//                                     value={formData.custom_content.css}
//                                     onChange={(e) =>
//                                       handleCustomContentChange(
//                                         "css",
//                                         e.target.value
//                                       )
//                                     }
//                                     name="css"
//                                     className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[100px]"
//                                   />
//                                   <Textarea
//                                     label="JS"
//                                     value={formData.custom_content.js}
//                                     onChange={(e) =>
//                                       handleCustomContentChange(
//                                         "js",
//                                         e.target.value
//                                       )
//                                     }
//                                     name="js"
//                                     className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[100px]"
//                                   />
//                                 </div>
//                               )}
//                             </CardContent>
//                           )}
//                         </Card>

//                         <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                           <CardHeader
//                             className="flex flex-row justify-between items-center cursor-pointer py-3"
//                             onClick={() => toggleSection("targeting")}
//                           >
//                             <CardTitle className="text-base">
//                               Targeting Settings
//                             </CardTitle>
//                             {expandedSections.targeting ? (
//                               <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             ) : (
//                               <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             )}
//                           </CardHeader>
//                           {expandedSections.targeting && (
//                             <CardContent className="space-y-4 pt-4">
//                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <Select
//                                   label="Page Match Type"
//                                   value={formData.target_pages.match_type}
//                                   options={matchTypeOptions}
//                                   onChange={(val) =>
//                                     handleNestedChange(
//                                       "target_pages",
//                                       "match_type",
//                                       val
//                                     )
//                                   }
//                                   name="match_type"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Textarea
//                                   label="Paths (comma separated)"
//                                   value={formData.target_pages.paths.join(", ")}
//                                   onChange={(e) =>
//                                     handleNestedChange(
//                                       "target_pages",
//                                       "paths",
//                                       e.target.value
//                                         .split(",")
//                                         .map((p) => p.trim())
//                                         .filter((p) => p)
//                                     )
//                                   }
//                                   error={errors.target_pages}
//                                   name="paths"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                                 <Select
//                                   label="Devices"
//                                   isMulti
//                                   value={formData.target_audience.device}
//                                   options={deviceOptions}
//                                   onChange={(val) =>
//                                     handleNestedChange(
//                                       "target_audience",
//                                       "device",
//                                       val
//                                     )
//                                   }
//                                   name="device"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Select
//                                   label="Age Range"
//                                   isMulti
//                                   value={formData.target_audience.age_range}
//                                   options={ageRangeOptions}
//                                   onChange={(val) =>
//                                     handleNestedChange(
//                                       "target_audience",
//                                       "age_range",
//                                       val
//                                     )
//                                   }
//                                   name="age_range"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Select
//                                   label="Interests"
//                                   isMulti
//                                   value={formData.target_audience.interests}
//                                   options={interestOptions}
//                                   onChange={(val) =>
//                                     handleNestedChange(
//                                       "target_audience",
//                                       "interests",
//                                       val
//                                     )
//                                   }
//                                   name="interests"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Select
//                                   label="Geo"
//                                   isMulti
//                                   value={formData.target_audience.geo}
//                                   options={geoOptions}
//                                   onChange={(val) =>
//                                     handleNestedChange(
//                                       "target_audience",
//                                       "geo",
//                                       val
//                                     )
//                                   }
//                                   name="geo"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                               </div>
//                             </CardContent>
//                           )}
//                         </Card>

//                         <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                           <CardHeader
//                             className="flex flex-row justify-between items-center cursor-pointer py-3"
//                             onClick={() => toggleSection("schedule")}
//                           >
//                             <CardTitle className="text-base">
//                               Schedule Settings
//                             </CardTitle>
//                             {expandedSections.schedule ? (
//                               <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             ) : (
//                               <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             )}
//                           </CardHeader>
//                           {expandedSections.schedule && (
//                             <CardContent className="space-y-4 pt-4">
//                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <DateTimePicker
//                                   label="Start Time"
//                                   value={formData.schedule.start}
//                                   onChange={(val) =>
//                                     handleNestedChange("schedule", "start", val)
//                                   }
//                                   error={errors.schedule}
//                                   name="start"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <DateTimePicker
//                                   label="End Time"
//                                   value={formData.schedule.end}
//                                   onChange={(val) =>
//                                     handleNestedChange("schedule", "end", val)
//                                   }
//                                   error={errors.schedule}
//                                   name="end"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Input
//                                   label="Timezone"
//                                   value={formData.schedule.timezone}
//                                   onChange={(e) =>
//                                     handleNestedChange(
//                                       "schedule",
//                                       "timezone",
//                                       e.target.value
//                                     )
//                                   }
//                                   name="timezone"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                               </div>
//                             </CardContent>
//                           )}
//                         </Card>

//                         <div className="sticky bottom-0 bg-white dark:bg-gray-900 py-4 border-t dark:border-gray-700 flex justify-end gap-4">
//                           <Button
//                             type="button"
//                             variant="outline"
//                             onClick={() =>
//                               setFormData(normalizeAdData(defaultAd))
//                             }
//                             className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
//                           >
//                             Reset
//                           </Button>
//                           <Button
//                             type="button"
//                             onClick={handleSaveAd}
//                             variant="outline"
//                             className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
//                           >
//                             {editingAd ? "Update Ad" : "Create Ad"}
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>

//                   <div className="col-span-1">
//                     <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700 sticky top-4">
//                       <CardHeader>
//                         <CardTitle className="text-base">Ad Preview</CardTitle>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">
//                           Real-time preview of your ad configuration
//                         </p>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         <div className="border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
//                           <AdPreview ad={formData} />
//                         </div>
//                         <div className="space-y-2 text-sm">
//                           <div className="flex justify-between">
//                             <span className="text-gray-600 dark:text-gray-300">
//                               Type:
//                             </span>
//                             <span className="text-gray-800 dark:text-gray-100">
//                               {formData.ad_type}
//                             </span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600 dark:text-gray-300">
//                               Placement:
//                             </span>
//                             <span className="text-gray-800 dark:text-gray-100">
//                               {formData.placement}
//                             </span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600 dark:text-gray-300">
//                               Dimensions:
//                             </span>
//                             <span className="text-gray-800 dark:text-gray-100">
//                               {formData.dimensions.width}x
//                               {formData.dimensions.height}px
//                             </span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600 dark:text-gray-300">
//                               Status:
//                             </span>
//                             <span className="text-gray-800 dark:text-gray-100">
//                               {formData.is_active ? "Active" : "Inactive"}
//                             </span>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           )}
//         </main>
//       </div>

//       <Modal
//         isOpen={!!previewAd}
//         onClose={handleClosePreview}
//         title="Ad Preview"
//         className="dark:bg-gray-800 dark:text-gray-100 max-w-2xl"
//       >
//         <div className="space-y-4">
//           <AdPreview ad={previewAd} />
//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="text-gray-600 dark:text-gray-300">Ad Name:</p>
//               <p className="text-gray-800 dark:text-gray-100">
//                 {previewAd?.name}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-600 dark:text-gray-300">Type:</p>
//               <p className="text-gray-800 dark:text-gray-100">
//                 {previewAd?.ad_type}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-600 dark:text-gray-300">Placement:</p>
//               <p className="text-gray-800 dark:text-gray-100">
//                 {previewAd?.placement}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-600 dark:text-gray-300">Status:</p>
//               <p className="text-gray-800 dark:text-gray-100">
//                 {previewAd?.is_active ? "Active" : "Inactive"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AdSenseManagerView;



// import React, { useState, useMemo, useEffect } from "react";
// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "../../../common/tabs/Tabs";
// import Input from "../../../controls/input/inputView";
// import Select from "../../../controls/selection/selection";
// import Textarea from "../../../controls/textarea/Textarea";
// import FileUpload from "../../../controls/fileUpload/fileUpload";
// import DateTimePicker from "../../../controls/datetimePicker/DateTimePicker";
// import AdPreview from "../../../common/adPreview/adPreview";
// import { ChevronDown, ChevronUp, Plus, Trash2, Eye } from "lucide-react";
// import Button from "../../../controls/button/buttonView";
// import TopNavbar from "../../../common/topNavbar/topNavbar";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "../../../common/card/Card";
// import Modal from "../../../common/modal/modal";
// import ReusableDataTable from "../../../common/DataTable/DataTable";

// const defaultAudience = {
//   geo: [],
//   device: [],
//   interests: [],
//   age_range: [],
// };

// const defaultSchedule = {
//   start: "",
//   end: "",
//   timezone: "UTC",
// };

// const defaultDimensions = {
//   width: 0,
//   height: 0,
//   unit: "px",
// };

// const defaultCustomContent = {
//   html: "",
//   css: "",
//   js: "",
//   image_url: "",
//   youtube_url: "",
//   text: "",
//   content_type: "url",
// };

// const normalizeAdData = (ad) => ({
//   id: ad.id || null,
//   name: ad.name || "",
//   code: ad.code || "",
//   ad_type: ad.ad_type || "banner",
//   placement: ad.placement || "header",
//   custom_content: {
//     ...defaultCustomContent,
//     ...ad.custom_content,
//     image_url: ad.custom_content?.image_url || "", // Preserve backend URL
//     youtube_url: ad.custom_content?.youtube_url || "", // Preserve backend URL
//   },
//   dimensions: { ...defaultDimensions, ...ad.dimensions },
//   is_active: ad.is_active ?? true,
//   target_pages: {
//     match_type: ad.target_pages?.match_type || "exact",
//     paths: Array.isArray(ad.target_pages?.paths) ? ad.target_pages.paths : [],
//   },
//   target_audience: { ...defaultAudience, ...ad.target_audience },
//   schedule: { ...defaultSchedule, ...ad.schedule },
//   priority: ad.priority || 0,
//   status: ad.status || (ad.is_active ? "active" : "paused"),
//   file: null, // File object is not stored in backend, reset to null
// });

// const matchTypeOptions = [
//   { value: "exact", label: "Exact Match" },
//   { value: "prefix", label: "Starts With" },
//   { value: "regex", label: "Regex Match" },
// ];

// const deviceOptions = ["Mobile", "Desktop", "Tablet"].map((d) => ({
//   label: d,
//   value: d.toLowerCase(),
// }));
// const ageRangeOptions = ["18-24", "25-34", "35-44", "45-54", "55+"].map(
//   (r) => ({
//     label: r,
//     value: r,
//   })
// );
// const interestOptions = ["Tech", "Finance", "Travel", "Fitness", "Gaming"].map(
//   (i) => ({
//     label: i,
//     value: i.toLowerCase(),
//   })
// );
// const geoOptions = ["US", "UK", "CA", "IN", "AU"].map((g) => ({
//   label: g,
//   value: g,
// }));

// const contentTypeOptions = {
//   banner: [
//     { value: "url", label: "Image URL" },
//     { value: "custom_image", label: "Upload Image" },
//   ],
//   video: [
//     { value: "url", label: "YouTube URL" },
//     { value: "custom_video", label: "Upload Video" },
//   ],
//   native: [{ value: "text", label: "Text Content" }],
//   custom: [{ value: "code", label: "Custom Code" }],
// };

// const densityOptions = [
//   { value: "low", label: "Low" },
//   { value: "balanced", label: "Balanced" },
//   { value: "high", label: "High" },
// ];

// const formatOptions = [
//   { value: "banner", label: "Banner" },
//   { value: "responsive", label: "Responsive" },
//   { value: "native", label: "Native" },
// ];

// const pageOptions = [
//   { value: "all", label: "All Pages" },
//   { value: "home", label: "Home Page" },
//   { value: "posts", label: "Blog Posts" },
//   { value: "custom", label: "Custom" },
// ];

// const statusOptions = [
//   { value: "all", label: "All Status" },
//   { value: "active", label: "Active" },
//   { value: "paused", label: "Paused" },
//   { value: "archived", label: "Archived" },
// ];

// const AdSenseManagerView = ({
//   publisherId,
//   adClient,
//   placements,
//   adDensity,
//   adFormat,
//   targetPages,
//   adUnits,
//   loading,
//   error,
//   onUpdatePlacement,
//   onAddCustomAd,
//   onUpdateCustomAd,
//   onDeleteAdUnit,
//   onSaveAdSettings,
// }) => {
//   const [editingAd, setEditingAd] = useState(null);
//   const [previewAd, setPreviewAd] = useState(null);
//   const [activeTab, setActiveTab] = useState("configuration");
//   const [formData, setFormData] = useState(normalizeAdData({}));
//   const [errors, setErrors] = useState({});
//   const [configErrors, setConfigErrors] = useState({});
//   const [expandedSections, setExpandedSections] = useState({
//     general: true,
//     content: true,
//     targeting: true,
//     schedule: true,
//   });
//   const [localPublisherId, setLocalPublisherId] = useState(publisherId || "");
//   const [localAdClient, setLocalAdClient] = useState(adClient || "");
//   const [localAdDensity, setLocalAdDensity] = useState(adDensity || "balanced");
//   const [localAdFormat, setLocalAdFormat] = useState(adFormat || "responsive");
//   const [localTargetPages, setLocalTargetPages] = useState(
//     targetPages || "all"
//   );
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const defaultAd = useMemo(
//     () => ({
//       name: "",
//       code: "",
//       ad_type: "banner",
//       placement: "header",
//       custom_content: defaultCustomContent,
//       dimensions: defaultDimensions,
//       is_active: true,
//       target_pages: { match_type: "exact", paths: [] },
//       target_audience: defaultAudience,
//       schedule: defaultSchedule,
//       priority: 0,
//     }),
//     []
//   );

//   useEffect(() => {
//     setLocalPublisherId(publisherId || "");
//     setLocalAdClient(adClient || "");
//     setLocalAdDensity(adDensity || "balanced");
//     setLocalAdFormat(adFormat || "responsive");
//     setLocalTargetPages(targetPages || "all");
//     setConfigErrors({});
//   }, [publisherId, adClient, adDensity, adFormat, targetPages]);

//   useEffect(() => {
//     console.log("formData updated:", formData);
//   }, [formData]);

//   const handleTabChange = (newTab) => {
//     setActiveTab(newTab);
//     if (newTab !== "create") {
//       setEditingAd(null);
//       setFormData(normalizeAdData({}));
//     } else {
//       setFormData(
//         editingAd ? normalizeAdData(editingAd) : normalizeAdData(defaultAd)
//       );
//     }
//   };

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     setErrors((prev) => ({ ...prev, [field]: null }));
//   };

//   const handleNestedChange = (group, key, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [group]: { ...prev[group], [key]: value },
//     }));
//     setErrors((prev) => ({ ...prev, [group]: null }));
//   };

//   const handleCustomContentChange = (key, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       custom_content: { ...prev.custom_content, [key]: value },
//     }));
//     setErrors((prev) => ({ ...prev, custom_content: null }));
//   };

//   const handleFileChange = (file) => {
//     console.log("Selected file:", file);
//     setFormData((prev) => ({
//       ...prev,
//       file: file,
//       custom_content: {
//         ...prev.custom_content,
//         image_url:
//           file && formData.ad_type === "banner"
//             ? URL.createObjectURL(file)
//             : prev.custom_content.image_url,
//         youtube_url:
//           file && formData.ad_type === "video"
//             ? URL.createObjectURL(file)
//             : prev.custom_content.youtube_url,
//       },
//     }));
//     setErrors((prev) => ({ ...prev, file: null }));
//   };

//   const validateConfiguration = () => {
//     const newErrors = {};
//     if (!localPublisherId) newErrors.publisherId = "Publisher ID is required";
//     if (!localAdClient) newErrors.adClient = "Ad Client is required";
//     if (!localAdDensity) newErrors.adDensity = "Ad density is required";
//     if (!["low", "balanced", "high"].includes(localAdDensity)) {
//       newErrors.adDensity = "Ad density must be low, balanced, or high";
//     }
//     if (!localAdFormat) newErrors.adFormat = "Ad format is required";
//     if (!localTargetPages) newErrors.targetPages = "Target pages is required";
//     setConfigErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSaveAd = (e) => {
//     e.preventDefault();

//     // Validation
//     const newErrors = {};
//     if (!formData.name) newErrors.name = "Ad name is required";
//     if (!formData.code) newErrors.code = "Ad code is required";
//     if (
//       formData.custom_content.content_type === "custom_image" &&
//       !formData.file &&
//       !formData.custom_content.image_url
//     ) {
//       newErrors.file = "Image file or URL is required for custom image";
//     }
//     if (
//       formData.custom_content.content_type === "custom_video" &&
//       !formData.file &&
//       !formData.custom_content.youtube_url
//     ) {
//       newErrors.file = "Video file or URL is required for custom video";
//     }
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) {
//       console.error("Validation errors:", newErrors);
//       return;
//     }

//     // Prepare the ad data
//     const dataToSend = {
//       name: formData.name,
//       code: formData.code,
//       ad_type: formData.ad_type,
//       placement: formData.placement,
//       dimensions: formData.dimensions,
//       is_active: formData.is_active,
//       target_pages: formData.target_pages,
//       target_audience: formData.target_audience,
//       schedule: formData.schedule,
//       priority: formData.priority,
//       status: formData.is_active ? "active" : "paused",
//       custom_content: {
//         ...formData.custom_content,
//         image_url: formData.file ? "" : formData.custom_content.image_url, // Preserve backend URL if no new file
//         youtube_url: formData.file ? "" : formData.custom_content.youtube_url, // Preserve backend URL if no new file
//       },
//     };

//     // Handle FormData for file uploads
//     if (formData.file) {
//       console.log("Preparing FormData with file:", formData.file);
//       const formDataToSend = new FormData();
//       formDataToSend.append("file", formData.file);
//       formDataToSend.append("data", JSON.stringify(dataToSend));

//       // Debug FormData contents
//       for (const [key, value] of formDataToSend.entries()) {
//         console.log(`FormData entry in handleSaveAd - ${key}:`, value);
//       }

//       editingAd
//         ? onUpdateCustomAd({ id: formData.id, data: formDataToSend })
//         : onAddCustomAd(formDataToSend);
//     } else {
//       console.log("Sending JSON data:", dataToSend);
//       // Only allow JSON payload for non-file content types or if URL is provided
//       if (
//         formData.custom_content.content_type !== "custom_image" &&
//         formData.custom_content.content_type !== "custom_video"
//       ) {
//         editingAd
//           ? onUpdateCustomAd({ id: formData.id, data: dataToSend })
//           : onAddCustomAd(dataToSend);
//       } else if (
//         (formData.custom_content.content_type === "custom_image" &&
//           formData.custom_content.image_url) ||
//         (formData.custom_content.content_type === "custom_video" &&
//           formData.custom_content.youtube_url)
//       ) {
//         editingAd
//           ? onUpdateCustomAd({ id: formData.id, data: dataToSend })
//           : onAddCustomAd(dataToSend);
//       } else {
//         console.error(
//           "Cannot create ad without file or URL for custom_image or custom_video"
//         );
//         setErrors({ file: "File or URL is required for this content type" });
//         return;
//       }
//     }

//     // Reset form
//     setEditingAd(null);
//     setFormData(normalizeAdData(defaultAd));
//     setActiveTab("custom");
//     setErrors({});
//   };

//   const handleOpenPreview = (ad) => {
//     setPreviewAd(ad);
//   };

//   const handleClosePreview = () => {
//     setPreviewAd(null);
//   };

//   const handleEditAd = (ad) => {
//     setEditingAd(ad);
//     setFormData(normalizeAdData(ad));
//     setActiveTab("create");
//   };

//   const handleAddCustomAd = () => {
//     setEditingAd(null);
//     setFormData(normalizeAdData(defaultAd));
//     setActiveTab("create");
//   };

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   const sampleUserData = {
//     name: "John Doe",
//     email: "john@example.com",
//   };

//   const handleSearch = (query) => {
//     console.log("Search query:", query);
//   };

//   const handleSaveConfiguration = () => {
//     if (!validateConfiguration()) return;
//     onSaveAdSettings({
//       publisher_id: localPublisherId,
//       ad_client: localAdClient,
//       ad_density: localAdDensity,
//       ad_format: localAdFormat,
//       target_pages: localTargetPages,
//     });
//   };

//   const columns = useMemo(
//     () => [
//       {
//         name: "Name",
//         selector: (row) => row.name,
//         sortable: true,
//         width:"200px",
//       },
//       {
//         name: "Type",
//         selector: (row) => row.ad_type,
//         sortable: true,
//         width:"200px",
//       },
//       {
//         name: "Placement",
//         selector: (row) => row.placement,
//         sortable: true,
//         width:"100px",

//       },
//       {
//         name: "Priority",
//         selector: (row) => row.priority,
//         sortable: true,
//         width:"150px",
//       },
//       {
//         name: "Status",
//         selector: (row) => row.status,
//         sortable: true,
//         width:"150px",

//         cell: (row) => (
//           <span
//             className={`capitalize px-2 py-1 rounded-[5px] text-xs ${
//               row.status === "active"
//                 ? "bg-green-100 text-green-800"
//                 : row.status === "paused"
//                 ? "bg-yellow-100 text-yellow-800"
//                 : "bg-gray-100 text-gray-800"
//             }`}
//           >
//             {row.status}
//           </span>
//         ),
//       },
//       {
//         name: "Actions",
//         cell: (row) => (
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               onClick={() => handleEditAd(row)}
//               className="border-gray-300 dark:border-gray-600 dark:text-gray-100 text-xs px-2 py-1"
//             >
//               Edit
//             </Button>
//             <Button
//               variant="outline"
//               onClick={() => onDeleteAdUnit(row.id)}
//               className="border-gray-300 dark:border-gray-600 dark:text-gray-100 text-xs px-2 py-1"
//             >
//               <Trash2 className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               onClick={() => handleOpenPreview(row)}
//               className="border-gray-300 dark:border-gray-600 dark:text-gray-100 text-xs px-2 py-1"
//             >
//               <Eye className="h-4 w-4" />
//             </Button>
//           </div>
//         ),
//         ignoreRowClick: true,
//         allowOverflow: true,
//         button: true,
//       },
//     ],
//     []
//   );

//   const filteredAdUnits = useMemo(() => {
//     if (statusFilter === "all") return adUnits;
//     return adUnits?.filter((ad) => ad.status === statusFilter);
//   }, [adUnits, statusFilter]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-0 py-0 space-y-6">
//       <div className="flex-1 flex flex-col">
//         <TopNavbar
//           userData={sampleUserData}
//           onSearch={handleSearch}
//           notificationCount={3}
//           toggleSidebar={() => console.log("Sidebar toggled")}
//         />

//         <main className="flex-1 w-full mx-auto px-6 py-3 space-y-2">
//           <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
//             Ad Management
//           </h1>
//           <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
//             Configure and optimize your ad units to maximize revenue while
//             maintaining user experience.
//           </p>

//           {error && (
//             <div
//               className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//               role="alert"
//             >
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}

//           {!loading && (
//             <Tabs
//               value={activeTab}
//               onValueChange={handleTabChange}
//               className="space-y-4"
//             >
//               <TabsList className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 w-full">
//                 <TabsTrigger
//                   value="configuration"
//                   className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
//                 >
//                   Configuration
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="custom"
//                   className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
//                 >
//                   Custom Ads
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="create"
//                   className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
//                 >
//                   Create Ad
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="configuration" className="mt-6 space-y-6">
//                 <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                   <CardHeader>
//                     <CardTitle className="text-lg sm:text-xl">
//                       Ad Configuration
//                     </CardTitle>
//                     <p className="text-sm text-gray-600 dark:text-gray-300">
//                       Configure your AdSense account and global ad settings.
//                     </p>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     <div className="space-y-4">
//                       <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
//                         AdSense Account
//                       </h3>
//                       <Input
//                         label="Publisher ID"
//                         value={localPublisherId}
//                         onChange={(e) => setLocalPublisherId(e.target.value)}
//                         placeholder="e.g., pub-1234567890123456"
//                         className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                         error={configErrors.publisherId}
//                       />
//                       <Input
//                         label="Ad Client"
//                         value={localAdClient}
//                         onChange={(e) => setLocalAdClient(e.target.value)}
//                         placeholder="e.g., ca-pub-1234567890123456"
//                         className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                         error={configErrors.adClient}
//                       />
//                     </div>
//                     <div className="space-y-4">
//                       <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
//                         Global Ad Settings
//                       </h3>
//                       <div className="space-y-2">
//                         <Select
//                           label="Ad Density"
//                           options={densityOptions}
//                           value={localAdDensity}
//                           onChange={(value) => setLocalAdDensity(value)}
//                           className="dark:bg-gray-700 dark:text-gray-100"
//                           error={configErrors.adDensity}
//                         />
//                         <p className="text-xs text-gray-600 dark:text-gray-300">
//                           Controls how many ads are shown throughout your blog.
//                         </p>
//                       </div>
//                       <Select
//                         label="Preferred Ad Format"
//                         options={formatOptions}
//                         value={localAdFormat}
//                         onChange={(value) => setLocalAdFormat(value)}
//                         className="dark:bg-gray-700 dark:text-gray-100"
//                         error={configErrors.adFormat}
//                       />
//                       <Select
//                         label="Pages to Show Ads"
//                         options={pageOptions}
//                         value={localTargetPages}
//                         onChange={(value) => setLocalTargetPages(value)}
//                         className="dark:bg-gray-700 dark:text-gray-100"
//                         error={configErrors.targetPages}
//                       />
//                     </div>
//                     <Button
//                       onClick={handleSaveConfiguration}
//                       variant="outline"
//                       className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
//                     >
//                       Save Configuration
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="custom" className="mt-6">
//                 <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                   <CardHeader>
//                     <CardTitle className="text-lg sm:text-xl">
//                       Custom Advertisements
//                     </CardTitle>
//                     <p className="text-sm text-gray-600 dark:text-gray-300">
//                       Manage direct advertiser relationships and custom ad
//                       banners.
//                     </p>
//                   </CardHeader>
//                   <CardContent>
//                     {adUnits?.length === 0 ? (
//                       <div className="text-center py-6 space-y-4">
//                         <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
//                           No custom ads configured
//                         </h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">
//                           Create custom ad units for direct advertisers or
//                           promotional content.
//                         </p>
//                         <Button
//                           onClick={handleAddCustomAd}
//                           variant="outline"
//                           className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
//                         >
//                           <Plus className="h-4 w-4 mr-2" />
//                           Add Custom Ad
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <div className="flex justify-between items-center">
//                           <Select
//                             label="Filter by Status"
//                             options={statusOptions}
//                             value={statusFilter}
//                             onChange={(value) => {
//                               setStatusFilter(value);
//                               setCurrentPage(1);
//                             }}
//                             className="dark:bg-gray-700 dark:text-gray-100 w-48"
//                           />
//                           <Button
//                             onClick={handleAddCustomAd}
//                             variant="outline"
//                             className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
//                           >
//                             <Plus className="h-4 w-4 mr-2" />
//                             Add Custom Ad
//                           </Button>
//                         </div>
//                         <ReusableDataTable
//                           columns={columns}
//                           data={filteredAdUnits || []}
//                           loading={loading}
//                           rowsPerPage={rowsPerPage}
//                           currentPage={currentPage}
//                           onChangePage={handlePageChange}
//                           onRowClick={(row) => handleEditAd(row)}
//                           paginationRowsPerPageOptions={[5, 10, 20, 50]}
//                           loadingMessage="Loading ads..."
//                           noDataMessage="No ads available"
//                           striped={true}
//                           highlightOnHover={true}
//                           noHeader={true}
//                         />
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="create" className="mt-6">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                   <div className="col-span-1 lg:col-span-2 space-y-6">
//                     <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                       <CardHeader>
//                         <CardTitle className="text-lg sm:text-xl">
//                           {editingAd ? "Edit Ad" : "Create New Ad"}
//                         </CardTitle>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">
//                           Configure your custom ad unit with detailed settings
//                           and preview it in real-time.
//                         </p>
//                       </CardHeader>
//                       <CardContent className="space-y-6">
//                         <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                           <CardHeader
//                             className="flex flex-row justify-between items-center cursor-pointer py-3"
//                             onClick={() => toggleSection("general")}
//                           >
//                             <CardTitle className="text-base">
//                               General Settings
//                             </CardTitle>
//                             {expandedSections.general ? (
//                               <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             ) : (
//                               <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             )}
//                           </CardHeader>
//                           {expandedSections.general && (
//                             <CardContent className="space-y-4 pt-4">
//                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <Input
//                                   label="Ad Name"
//                                   value={formData.name}
//                                   onChange={(e) =>
//                                     handleChange("name", e.target.value)
//                                   }
//                                   error={errors.name}
//                                   name="name"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                                 <Input
//                                   label="Ad Code"
//                                   value={formData.code}
//                                   onChange={(e) =>
//                                     handleChange("code", e.target.value)
//                                   }
//                                   error={errors.code}
//                                   name="code"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                                 <Select
//                                   label="Ad Type"
//                                   options={[
//                                     { value: "banner", label: "Banner" },
//                                     { value: "video", label: "Video" },
//                                     { value: "native", label: "Native" },
//                                     { value: "custom", label: "Custom" },
//                                   ]}
//                                   value={formData.ad_type}
//                                   onChange={(value) => {
//                                     handleChange("ad_type", value);
//                                     handleCustomContentChange(
//                                       "content_type",
//                                       contentTypeOptions[value]?.[0]?.value ||
//                                         "url"
//                                     );
//                                   }}
//                                   name="ad_type"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Select
//                                   label="Placement"
//                                   options={[
//                                     { value: "header", label: "Header" },
//                                     { value: "sidebar", label: "Sidebar" },
//                                     {
//                                       value: "in_content",
//                                       label: "In Content",
//                                     },
//                                     { value: "footer", label: "Footer" },
//                                     { value: "custom", label: "Custom" },
//                                   ]}
//                                   value={formData.placement}
//                                   onChange={(value) =>
//                                     handleChange("placement", value)
//                                   }
//                                   name="placement"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Input
//                                   label="Width (px)"
//                                   type="number"
//                                   value={formData.dimensions.width}
//                                   onChange={(e) =>
//                                     handleNestedChange(
//                                       "dimensions",
//                                       "width",
//                                       Number(e.target.value)
//                                     )
//                                   }
//                                   error={errors.dimensions}
//                                   name="dimensions_width"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                                 <Input
//                                   label="Height (px)"
//                                   type="number"
//                                   value={formData.dimensions.height}
//                                   onChange={(e) =>
//                                     handleNestedChange(
//                                       "dimensions",
//                                       "height",
//                                       Number(e.target.value)
//                                     )
//                                   }
//                                   error={errors.dimensions}
//                                   name="dimensions_height"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                                 <Input
//                                   label="Priority"
//                                   type="number"
//                                   value={formData.priority}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       "priority",
//                                       Number(e.target.value)
//                                     )
//                                   }
//                                   name="priority"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                                 <div className="flex items-center gap-2">
//                                   <input
//                                     type="checkbox"
//                                     checked={formData.is_active}
//                                     onChange={(e) =>
//                                       handleChange(
//                                         "is_active",
//                                         e.target.checked
//                                       )
//                                     }
//                                     name="is_active"
//                                     className="dark:bg-gray-700 dark:border-gray-600"
//                                   />
//                                   <label className="text-sm text-gray-700 dark:text-gray-300">
//                                     Active
//                                   </label>
//                                 </div>
//                               </div>
//                             </CardContent>
//                           )}
//                         </Card>

//                         <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                           <CardHeader
//                             className="flex flex-row justify-between items-center cursor-pointer py-3"
//                             onClick={() => toggleSection("content")}
//                           >
//                             <CardTitle className="text-base">
//                               Content Settings
//                             </CardTitle>
//                             {expandedSections.content ? (
//                               <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             ) : (
//                               <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             )}
//                           </CardHeader>
//                           {expandedSections.content && (
//                             <CardContent className="space-y-4 pt-4">
//                               {(formData.ad_type === "banner" ||
//                                 formData.ad_type === "video") && (
//                                 <Select
//                                   label="Content Type"
//                                   options={
//                                     contentTypeOptions[formData.ad_type] || []
//                                   }
//                                   value={formData.custom_content.content_type}
//                                   onChange={(value) => {
//                                     handleCustomContentChange(
//                                       "content_type",
//                                       value
//                                     );
//                                     handleCustomContentChange("image_url", "");
//                                     handleCustomContentChange(
//                                       "youtube_url",
//                                       ""
//                                     );
//                                     handleChange("file", null);
//                                   }}
//                                   name="content_type"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                               )}
//                               {formData.ad_type === "banner" &&
//                                 formData.custom_content.content_type ===
//                                   "url" && (
//                                   <Input
//                                     label="Image URL"
//                                     value={formData.custom_content.image_url}
//                                     onChange={(e) =>
//                                       handleCustomContentChange(
//                                         "image_url",
//                                         e.target.value
//                                       )
//                                     }
//                                     error={errors.image_url}
//                                     name="image_url"
//                                     className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                   />
//                                 )}
//                               {formData.ad_type === "banner" &&
//                                 formData.custom_content.content_type ===
//                                   "custom_image" && (
//                                   <>
//                                     <FileUpload
//                                       label="Upload Image"
//                                       value={formData.file}
//                                       onChange={handleFileChange}
//                                       accept="image/*"
//                                       preview={true}
//                                       error={errors.file}
//                                       name="file"
//                                       className="dark:bg-gray-700 dark:text-gray-100"
//                                     />
//                                     {formData.custom_content.image_url && (
//                                       <Input
//                                         label="Current Image URL"
//                                         value={formData.custom_content.image_url}
//                                         readOnly
//                                         className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                       />
//                                     )}
//                                   </>
//                                 )}
//                               {formData.ad_type === "video" &&
//                                 formData.custom_content.content_type ===
//                                   "url" && (
//                                   <Input
//                                     label="YouTube URL"
//                                     value={formData.custom_content.youtube_url}
//                                     onChange={(e) =>
//                                       handleCustomContentChange(
//                                         "youtube_url",
//                                         e.target.value
//                                       )
//                                     }
//                                     error={errors.youtube_url}
//                                     name="youtube_url"
//                                     className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                   />
//                                 )}
//                               {formData.ad_type === "video" &&
//                                 formData.custom_content.content_type ===
//                                   "custom_video" && (
//                                   <>
//                                     <FileUpload
//                                       label="Upload Video"
//                                       value={formData.file}
//                                       onChange={handleFileChange}
//                                       accept="video/*"
//                                       preview={true}
//                                       error={errors.file}
//                                       name="file"
//                                       className="dark:bg-gray-700 dark:text-gray-100"
//                                     />
//                                     {formData.custom_content.youtube_url && (
//                                       <Input
//                                         label="Current Video URL"
//                                         value={
//                                           formData.custom_content.youtube_url
//                                         }
//                                         readOnly
//                                         className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                       />
//                                     )}
//                                   </>
//                                 )}
//                               {formData.ad_type === "native" && (
//                                 <Textarea
//                                   label="Native Ad Text"
//                                   value={formData.custom_content.text}
//                                   onChange={(e) =>
//                                     handleCustomContentChange(
//                                       "text",
//                                       e.target.value
//                                     )
//                                   }
//                                   error={errors.custom_content}
//                                   name="text"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                               )}
//                               {formData.ad_type === "custom" && (
//                                 <div className="space-y-4">
//                                   <Textarea
//                                     label="HTML"
//                                     value={formData.custom_content.html}
//                                     onChange={(e) =>
//                                       handleCustomContentChange(
//                                         "html",
//                                         e.target.value
//                                       )
//                                     }
//                                     error={errors.custom_content}
//                                     name="html"
//                                     className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[100px]"
//                                   />
//                                   <Textarea
//                                     label="CSS"
//                                     value={formData.custom_content.css}
//                                     onChange={(e) =>
//                                       handleCustomContentChange(
//                                         "css",
//                                         e.target.value
//                                       )
//                                     }
//                                     name="css"
//                                     className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[100px]"
//                                   />
//                                   <Textarea
//                                     label="JS"
//                                     value={formData.custom_content.js}
//                                     onChange={(e) =>
//                                       handleCustomContentChange(
//                                         "js",
//                                         e.target.value
//                                       )
//                                     }
//                                     name="js"
//                                     className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[100px]"
//                                   />
//                                 </div>
//                               )}
//                             </CardContent>
//                           )}
//                         </Card>

//                         <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                           <CardHeader
//                             className="flex flex-row justify-between items-center cursor-pointer py-3"
//                             onClick={() => toggleSection("targeting")}
//                           >
//                             <CardTitle className="text-base">
//                               Targeting Settings
//                             </CardTitle>
//                             {expandedSections.targeting ? (
//                               <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             ) : (
//                               <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             )}
//                           </CardHeader>
//                           {expandedSections.targeting && (
//                             <CardContent className="space-y-4 pt-4">
//                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <Select
//                                   label="Page Match Type"
//                                   value={formData.target_pages.match_type}
//                                   options={matchTypeOptions}
//                                   onChange={(val) =>
//                                     handleNestedChange(
//                                       "target_pages",
//                                       "match_type",
//                                       val
//                                     )
//                                   }
//                                   name="match_type"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Textarea
//                                   label="Paths (comma separated)"
//                                   value={formData.target_pages.paths.join(", ")}
//                                   onChange={(e) =>
//                                     handleNestedChange(
//                                       "target_pages",
//                                       "paths",
//                                       e.target.value
//                                         .split(",")
//                                         .map((p) => p.trim())
//                                         .filter((p) => p)
//                                     )
//                                   }
//                                   error={errors.target_pages}
//                                   name="paths"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                                 <Select
//                                   label="Devices"
//                                   isMulti
//                                   value={formData.target_audience.device}
//                                   options={deviceOptions}
//                                   onChange={(val) =>
//                                     handleNestedChange(
//                                       "target_audience",
//                                       "device",
//                                       val
//                                     )
//                                   }
//                                   name="device"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Select
//                                   label="Age Range"
//                                   isMulti
//                                   value={formData.target_audience.age_range}
//                                   options={ageRangeOptions}
//                                   onChange={(val) =>
//                                     handleNestedChange(
//                                       "target_audience",
//                                       "age_range",
//                                       val
//                                     )
//                                   }
//                                   name="age_range"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Select
//                                   label="Interests"
//                                   isMulti
//                                   value={formData.target_audience.interests}
//                                   options={interestOptions}
//                                   onChange={(val) =>
//                                     handleNestedChange(
//                                       "target_audience",
//                                       "interests",
//                                       val
//                                     )
//                                   }
//                                   name="interests"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Select
//                                   label="Geo"
//                                   isMulti
//                                   value={formData.target_audience.geo}
//                                   options={geoOptions}
//                                   onChange={(val) =>
//                                     handleNestedChange(
//                                       "target_audience",
//                                       "geo",
//                                       val
//                                     )
//                                   }
//                                   name="geo"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                               </div>
//                             </CardContent>
//                           )}
//                         </Card>

//                         <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                           <CardHeader
//                             className="flex flex-row justify-between items-center cursor-pointer py-3"
//                             onClick={() => toggleSection("schedule")}
//                           >
//                             <CardTitle className="text-base">
//                               Schedule Settings
//                             </CardTitle>
//                             {expandedSections.schedule ? (
//                               <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             ) : (
//                               <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                             )}
//                           </CardHeader>
//                           {expandedSections.schedule && (
//                             <CardContent className="space-y-4 pt-4">
//                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <DateTimePicker
//                                   label="Start Time"
//                                   value={formData.schedule.start}
//                                   onChange={(val) =>
//                                     handleNestedChange("schedule", "start", val)
//                                   }
//                                   error={errors.schedule}
//                                   name="start"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <DateTimePicker
//                                   label="End Time"
//                                   value={formData.schedule.end}
//                                   onChange={(val) =>
//                                     handleNestedChange("schedule", "end", val)
//                                   }
//                                   error={errors.schedule}
//                                   name="end"
//                                   className="dark:bg-gray-700 dark:text-gray-100"
//                                 />
//                                 <Input
//                                   label="Timezone"
//                                   value={formData.schedule.timezone}
//                                   onChange={(e) =>
//                                     handleNestedChange(
//                                       "schedule",
//                                       "timezone",
//                                       e.target.value
//                                     )
//                                   }
//                                   name="timezone"
//                                   className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
//                                 />
//                               </div>
//                             </CardContent>
//                           )}
//                         </Card>

//                         <div className="sticky bottom-0 bg-white dark:bg-gray-900 py-4 border-t dark:border-gray-700 flex justify-end gap-4">
//                           <Button
//                             type="button"
//                             variant="outline"
//                             onClick={() =>
//                               setFormData(normalizeAdData(defaultAd))
//                             }
//                             className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
//                           >
//                             Reset
//                           </Button>
//                           <Button
//                             type="button"
//                             onClick={handleSaveAd}
//                             variant="outline"
//                             className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
//                           >
//                             {editingAd ? "Update Ad" : "Create Ad"}
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>

//                   <div className="col-span-1">
//                     <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700 sticky top-4">
//                       <CardHeader>
//                         <CardTitle className="text-base">Ad Preview</CardTitle>
//                         <p className="text-sm text-gray-600 dark:text-gray-300">
//                           Real-time preview of your ad configuration
//                         </p>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         <div className="border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
//                           <AdPreview ad={formData} />
//                         </div>
//                         <div className="space-y-2 text-sm">
//                           <div className="flex justify-between">
//                             <span className="text-gray-600 dark:text-gray-300">
//                               Type:
//                             </span>
//                             <span className="text-gray-800 dark:text-gray-100">
//                               {formData.ad_type}
//                             </span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600 dark:text-gray-300">
//                               Placement:
//                             </span>
//                             <span className="text-gray-800 dark:text-gray-100">
//                               {formData.placement}
//                             </span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600 dark:text-gray-300">
//                               Dimensions:
//                             </span>
//                             <span className="text-gray-800 dark:text-gray-100">
//                               {formData.dimensions.width}x
//                               {formData.dimensions.height}px
//                             </span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600 dark:text-gray-300">
//                               Status:
//                             </span>
//                             <span className="text-gray-800 dark:text-gray-100">
//                               {formData.is_active ? "Active" : "Inactive"}
//                             </span>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           )}
//         </main>
//       </div>

//       <Modal
//         isOpen={!!previewAd}
//         onClose={handleClosePreview}
//         title="Ad Preview"
//         className="dark:bg-gray-800 dark:text-gray-100 max-w-2xl"
//       >
//         <div className="space-y-4">
//           <AdPreview ad={previewAd} />
//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="text-gray-600 dark:text-gray-300">Ad Name:</p>
//               <p className="text-gray-800 dark:text-gray-100">
//                 {previewAd?.name}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-600 dark:text-gray-300">Type:</p>
//               <p className="text-gray-800 dark:text-gray-100">
//                 {previewAd?.ad_type}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-600 dark:text-gray-300">Placement:</p>
//               <p className="text-gray-800 dark:text-gray-100">
//                 {previewAd?.placement}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-600 dark:text-gray-300">Status:</p>
//               <p className="text-gray-800 dark:text-gray-100">
//                 {previewAd?.is_active ? "Active" : "Inactive"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AdSenseManagerView;




import React, { useState, useMemo, useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../common/tabs/Tabs";
import Input from "../../../controls/input/inputView";
import Select from "../../../controls/selection/selection";
import Textarea from "../../../controls/textarea/Textarea";
import FileUpload from "../../../controls/fileUpload/fileUpload";
import DateTimePicker from "../../../controls/datetimePicker/DateTimePicker";
import AdPreview from "../../../common/adPreview/adPreview";
import { ChevronDown, ChevronUp, Plus, Trash2, Eye } from "lucide-react";
import Button from "../../../controls/button/buttonView";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../common/card/Card";
import Modal from "../../../common/modal/modal";
import ReusableDataTable from "../../../common/DataTable/DataTable";

const defaultAudience = {
  geo: [],
  device: [],
  interests: [],
  age_range: [],
};

const defaultSchedule = {
  start: "",
  end: "",
  timezone: "UTC",
};

const defaultDimensions = {
  width: 0,
  height: 0,
  unit: "px",
};

const defaultCustomContent = {
  html: "",
  css: "",
  js: "",
  image_url: "",
  youtube_url: "",
  text: "",
  content_type: "url",
};

const normalizeAdData = (ad) => ({
  id: ad.id || null,
  name: ad.name || "",
  code: ad.code || "",
  ad_type: ad.ad_type || "banner",
  placement: ad.placement || "header",
  custom_content: {
    ...defaultCustomContent,
    ...ad.custom_content,
    image_url: ad.custom_content?.image_url || "",
    youtube_url: ad.custom_content?.youtube_url || "",
  },
  dimensions: { ...defaultDimensions, ...ad.dimensions },
  is_active: ad.is_active ?? true,
  target_pages: {
    match_type: ad.target_pages?.match_type || "exact",
    paths: Array.isArray(ad.target_pages?.paths) ? ad.target_pages.paths : [],
  },
  target_audience: { ...defaultAudience, ...ad.target_audience },
  schedule: { ...defaultSchedule, ...ad.schedule },
  priority: ad.priority || 0,
  status: ad.status || (ad.is_active ? "active" : "paused"),
  file: null,
});

const matchTypeOptions = [
  { value: "exact", label: "Exact Match" },
  { value: "prefix", label: "Starts With" },
  { value: "regex", label: "Regex Match" },
];

const deviceOptions = ["Mobile", "Desktop", "Tablet"].map((d) => ({
  label: d,
  value: d.toLowerCase(),
}));
const ageRangeOptions = ["18-24", "25-34", "35-44", "45-54", "55+"].map(
  (r) => ({
    label: r,
    value: r,
  })
);
const interestOptions = ["Tech", "Finance", "Travel", "Fitness", "Gaming"].map(
  (i) => ({
    label: i,
    value: i.toLowerCase(),
  })
);
const geoOptions = ["US", "UK", "CA", "IN", "AU"].map((g) => ({
  label: g,
  value: g,
}));

const contentTypeOptions = {
  banner: [
    { value: "url", label: "Image URL" },
    { value: "custom_image", label: "Upload Image" },
  ],
  video: [
    { value: "url", label: "YouTube URL" },
    { value: "custom_video", label: "Upload Video" },
  ],
  native: [{ value: "text", label: "Text Content" }],
  custom: [{ value: "code", label: "Custom Code" }],
};

const densityOptions = [
  { value: "low", label: "Low" },
  { value: "balanced", label: "Balanced" },
  { value: "high", label: "High" },
];

const formatOptions = [
  { value: "banner", label: "Banner" },
  { value: "responsive", label: "Responsive" },
  { value: "native", label: "Native" },
];

const pageOptions = [
  { value: "all", label: "All Pages" },
  { value: "home", label: "Home Page" },
  { value: "posts", label: "Blog Posts" },
  { value: "custom", label: "Custom" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "archived", label: "Archived" },
];

const AdSenseManagerView = ({
  publisherId,
  adClient,
  placements,
  adDensity,
  adFormat,
  targetPages,
  adUnits,
  loading,
  error,
  onUpdatePlacement,
  onAddCustomAd,
  onUpdateCustomAd,
  onDeleteAdUnit,
  onSaveAdSettings,
}) => {
  const [editingAd, setEditingAd] = useState(null);
  const [previewAd, setPreviewAd] = useState(null);
  const [activeTab, setActiveTab] = useState("configuration");
  const [formData, setFormData] = useState(normalizeAdData({}));
  const [errors, setErrors] = useState({});
  const [configErrors, setConfigErrors] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    content: true,
    targeting: true,
    schedule: true,
  });
  const [localPublisherId, setLocalPublisherId] = useState(publisherId || "");
  const [localAdClient, setLocalAdClient] = useState(adClient || "");
  const [localAdDensity, setLocalAdDensity] = useState(adDensity || "balanced");
  const [localAdFormat, setLocalAdFormat] = useState(adFormat || "responsive");
  const [localTargetPages, setLocalTargetPages] = useState(
    targetPages || "all"
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const defaultAd = useMemo(
    () => ({
      name: "",
      code: "",
      ad_type: "banner",
      placement: "header",
      custom_content: defaultCustomContent,
      dimensions: defaultDimensions,
      is_active: true,
      target_pages: { match_type: "exact", paths: [] },
      target_audience: defaultAudience,
      schedule: defaultSchedule,
      priority: 0,
    }),
    []
  );

  useEffect(() => {
    setLocalPublisherId(publisherId || "");
    setLocalAdClient(adClient || "");
    setLocalAdDensity(adDensity || "balanced");
    setLocalAdFormat(adFormat || "responsive");
    setLocalTargetPages(targetPages || "all");
    setConfigErrors({});
  }, [publisherId, adClient, adDensity, adFormat, targetPages]);


  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    if (newTab !== "create") {
      setEditingAd(null);
      setFormData(normalizeAdData({}));
    } else {
      setFormData(
        editingAd ? normalizeAdData(editingAd) : normalizeAdData(defaultAd)
      );
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleNestedChange = (group, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [group]: { ...prev[group], [key]: value },
    }));
    setErrors((prev) => ({ ...prev, [group]: null }));
  };

  const handleCustomContentChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      custom_content: { ...prev.custom_content, [key]: value },
    }));
    setErrors((prev) => ({ ...prev, custom_content: null }));
  };

  const handleFileChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      file: file,
      custom_content: {
        ...prev.custom_content,
        image_url:
          file && formData.ad_type === "banner"
            ? URL.createObjectURL(file)
            : prev.custom_content.image_url,
        youtube_url:
          file && formData.ad_type === "video"
            ? URL.createObjectURL(file)
            : prev.custom_content.youtube_url,
      },
    }));
    setErrors((prev) => ({ ...prev, file: null }));
  };

  const validateConfiguration = () => {
    const newErrors = {};
    if (!localPublisherId) newErrors.publisherId = "Publisher ID is required";
    if (!localAdClient) newErrors.adClient = "Ad Client is required";
    if (!localAdDensity) newErrors.adDensity = "Ad density is required";
    if (!["low", "balanced", "high"].includes(localAdDensity)) {
      newErrors.adDensity = "Ad density must be low, balanced, or high";
    }
    if (!localAdFormat) newErrors.adFormat = "Ad format is required";
    if (!localTargetPages) newErrors.targetPages = "Target pages is required";
    setConfigErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAd = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "Ad name is required";
    if (!formData.code) newErrors.code = "Ad code is required";
    if (
      formData.custom_content.content_type === "custom_image" &&
      !formData.file &&
      !formData.custom_content.image_url
    ) {
      newErrors.file = "Image file or URL is required for custom image";
    }
    if (
      formData.custom_content.content_type === "custom_video" &&
      !formData.file &&
      !formData.custom_content.youtube_url
    ) {
      newErrors.file = "Video file or URL is required for custom video";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      console.error("Validation errors:", newErrors);
      return;
    }

    const dataToSend = {
      name: formData.name,
      code: formData.code,
      ad_type: formData.ad_type,
      placement: formData.placement,
      dimensions: formData.dimensions,
      is_active: formData.is_active,
      target_pages: formData.target_pages,
      target_audience: formData.target_audience,
      schedule: formData.schedule,
      priority: formData.priority,
      status: formData.is_active ? "active" : "paused",
      custom_content: {
        ...formData.custom_content,
        image_url: formData.file ? "" : formData.custom_content.image_url,
        youtube_url: formData.file ? "" : formData.custom_content.youtube_url,
      },
    };

    if (formData.file) {
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.file);
      formDataToSend.append("data", JSON.stringify(dataToSend));

   

      editingAd
        ? onUpdateCustomAd({ id: formData.id, data: formDataToSend })
        : onAddCustomAd(formDataToSend);
    } else {
      if (
        formData.custom_content.content_type !== "custom_image" &&
        formData.custom_content.content_type !== "custom_video"
      ) {
        editingAd
          ? onUpdateCustomAd({ id: formData.id, data: dataToSend })
          : onAddCustomAd(dataToSend);
      } else if (
        (formData.custom_content.content_type === "custom_image" &&
          formData.custom_content.image_url) ||
        (formData.custom_content.content_type === "custom_video" &&
          formData.custom_content.youtube_url)
      ) {
        editingAd
          ? onUpdateCustomAd({ id: formData.id, data: dataToSend })
          : onAddCustomAd(dataToSend);
      } else {
        console.error(
          "Cannot create ad without file or URL for custom_image or custom_video"
        );
        setErrors({ file: "File or URL is required for this content type" });
        return;
      }
    }

    setEditingAd(null);
    setFormData(normalizeAdData(defaultAd));
    setActiveTab("custom");
    setErrors({});
  };

  const handleOpenPreview = (ad) => {
    setPreviewAd(ad);
  };

  const handleClosePreview = () => {
    setPreviewAd(null);
  };

  const handleEditAd = (ad) => {
    setEditingAd(ad);
    setFormData(normalizeAdData(ad));
    setActiveTab("create");
  };

  const handleAddCustomAd = () => {
    setEditingAd(null);
    setFormData(normalizeAdData(defaultAd));
    setActiveTab("create");
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sampleUserData = {
    name: "John Doe",
    email: "john@example.com",
  };

  const handleSearch = (query) => {
  };

  const handleSaveConfiguration = () => {
    if (!validateConfiguration()) return;
    onSaveAdSettings({
      publisher_id: localPublisherId,
      ad_client: localAdClient,
      ad_density: localAdDensity,
      ad_format: localAdFormat,
      target_pages: localTargetPages,
    });
  };

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "200px",
        cell: (row) => (
          <div className="text-gray-900 dark:text-gray-100">{row.name}</div>
        ),
      },
      {
        name: "Type",
        selector: (row) => row.ad_type,
        sortable: true,
        width: "200px",
        cell: (row) => (
          <div className="text-gray-900 dark:text-gray-100">{row.ad_type}</div>
        ),
      },
      {
        name: "Placement",
        selector: (row) => row.placement,
        sortable: true,
        width: "100px",
        cell: (row) => (
          <div className="text-gray-900 dark:text-gray-100">{row.placement}</div>
        ),
      },
      {
        name: "Priority",
        selector: (row) => row.priority,
        sortable: true,
        width: "150px",
        cell: (row) => (
          <div className="text-gray-900 dark:text-gray-100">{row.priority}</div>
        ),
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
        width: "150px",
        cell: (row) => (
          <span
            className={`capitalize px-2 py-1 rounded-[5px] text-xs ${
              row.status === "active"
                ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                : row.status === "paused"
                ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
            }`}
          >
            {row.status}
          </span>
        ),
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleEditAd(row)}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs px-2 py-1"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={() => onDeleteAdUnit(row.id)}
              className="border-gray-300 dark:border-gray-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 text-xs px-2 py-1"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOpenPreview(row)}
              className="border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-xs px-2 py-1"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    []
  );

  const filteredAdUnits = useMemo(() => {
    if (statusFilter === "all") return adUnits;
    return adUnits?.filter((ad) => ad.status === statusFilter);
  }, [adUnits, statusFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-0 py-0 space-y-6 transition-colors duration-200">
      <div className="flex-1 flex flex-col">
        <TopNavbar
          userData={sampleUserData}
          onSearch={handleSearch}
          notificationCount={3}
          toggleSidebar={() => console.log("Sidebar toggled")}
          className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        />

        <main className="flex-1 w-full mx-auto px-6 py-3 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Ad Management
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Configure and optimize your ad units to maximize revenue while
            maintaining user experience.
          </p>

          {error && (
            <div
              className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {!loading && (
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="space-y-4"
            >
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 w-full">
                <TabsTrigger
                  value="configuration"
                  className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
                >
                  Configuration
                </TabsTrigger>
                <TabsTrigger
                  value="custom"
                  className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
                >
                  Custom Ads
                </TabsTrigger>
                <TabsTrigger
                  value="create"
                  className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
                >
                  Create Ad
                </TabsTrigger>
              </TabsList>

              <TabsContent value="configuration" className="mt-6 space-y-6">
                <Card className="shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
                      Ad Configuration
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Configure your AdSense account and global ad settings.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                        AdSense Account
                      </h3>
                      <Input
                        label="Publisher ID"
                        value={localPublisherId}
                        onChange={(e) => setLocalPublisherId(e.target.value)}
                        placeholder="e.g., pub-1234567890123456"
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                        error={configErrors.publisherId}
                      />
                      <Input
                        label="Ad Client"
                        value={localAdClient}
                        onChange={(e) => setLocalAdClient(e.target.value)}
                        placeholder="e.g., ca-pub-1234567890123456"
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                        error={configErrors.adClient}
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                        Global Ad Settings
                      </h3>
                      <div className="space-y-2">
                        <Select
                          label="Ad Density"
                          options={densityOptions}
                          value={localAdDensity}
                          onChange={(value) => setLocalAdDensity(value)}
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                          error={configErrors.adDensity}
                        />
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Controls how many ads are shown throughout your blog.
                        </p>
                      </div>
                      <Select
                        label="Preferred Ad Format"
                        options={formatOptions}
                        value={localAdFormat}
                        onChange={(value) => setLocalAdFormat(value)}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                        error={configErrors.adFormat}
                      />
                      <Select
                        label="Pages to Show Ads"
                        options={pageOptions}
                        value={localTargetPages}
                        onChange={(value) => setLocalTargetPages(value)}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                        error={configErrors.targetPages}
                      />
                    </div>
                    <Button
                      onClick={handleSaveConfiguration}
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Save Configuration
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="custom" className="mt-6">
                <Card className="shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
                      Custom Advertisements
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage direct advertiser relationships and custom ad
                      banners.
                    </p>
                  </CardHeader>
                  <CardContent>
                    {adUnits?.length === 0 ? (
                      <div className="text-center py-6 space-y-4">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                          No custom ads configured
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Create custom ad units for direct advertisers or
                          promotional content.
                        </p>
                        <Button
                          onClick={handleAddCustomAd}
                          variant="outline"
                          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Custom Ad
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Select
                            label="Filter by Status"
                            options={statusOptions}
                            value={statusFilter}
                            onChange={(value) => {
                              setStatusFilter(value);
                              setCurrentPage(1);
                            }}
                            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 w-48"
                          />
                          <Button
                            onClick={handleAddCustomAd}
                            variant="outline"
                            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Custom Ad
                          </Button>
                        </div>
                        <ReusableDataTable
                          columns={columns}
                          data={filteredAdUnits || []}
                          loading={loading}
                          rowsPerPage={rowsPerPage}
                          currentPage={currentPage}
                          onChangePage={handlePageChange}
                          onRowClick={(row) => handleEditAd(row)}
                          paginationRowsPerPageOptions={[5, 10, 20, 50]}
                          loadingMessage="Loading ads..."
                          noDataMessage="No ads available"
                          striped={true}
                          highlightOnHover={true}
                          noHeader={true}
                          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="create" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="col-span-1 lg:col-span-2 space-y-6">
                    <Card className="shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
                          {editingAd ? "Edit Ad" : "Create New Ad"}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Configure your custom ad unit with detailed settings
                          and preview it in real-time.
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <Card className="shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <CardHeader
                            className="flex flex-row justify-between items-center cursor-pointer py-3"
                            onClick={() => toggleSection("general")}
                          >
                            <CardTitle className="text-base text-gray-900 dark:text-gray-100">
                              General Settings
                            </CardTitle>
                            {expandedSections.general ? (
                              <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            )}
                          </CardHeader>
                          {expandedSections.general && (
                            <CardContent className="space-y-4 pt-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input
                                  label="Ad Name"
                                  value={formData.name}
                                  onChange={(e) =>
                                    handleChange("name", e.target.value)
                                  }
                                  error={errors.name}
                                  name="name"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <Input
                                  label="Ad Code"
                                  value={formData.code}
                                  onChange={(e) =>
                                    handleChange("code", e.target.value)
                                  }
                                  error={errors.code}
                                  name="code"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <Select
                                  label="Ad Type"
                                  options={[
                                    { value: "banner", label: "Banner" },
                                    { value: "video", label: "Video" },
                                    { value: "native", label: "Native" },
                                    { value: "custom", label: "Custom" },
                                  ]}
                                  value={formData.ad_type}
                                  onChange={(value) => {
                                    handleChange("ad_type", value);
                                    handleCustomContentChange(
                                      "content_type",
                                      contentTypeOptions[value]?.[0]?.value ||
                                        "url"
                                    );
                                  }}
                                  name="ad_type"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <Select
                                  label="Placement"
                                  options={[
                                    { value: "header", label: "Header" },
                                    { value: "sidebar", label: "Sidebar" },
                                    {
                                      value: "in_content",
                                      label: "In Content",
                                    },
                                    { value: "footer", label: "Footer" },
                                    { value: "custom", label: "Custom" },
                                  ]}
                                  value={formData.placement}
                                  onChange={(value) =>
                                    handleChange("placement", value)
                                  }
                                  name="placement"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <Input
                                  label="Width (px)"
                                  type="number"
                                  value={formData.dimensions.width}
                                  onChange={(e) =>
                                    handleNestedChange(
                                      "dimensions",
                                      "width",
                                      Number(e.target.value)
                                    )
                                  }
                                  error={errors.dimensions}
                                  name="dimensions_width"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <Input
                                  label="Height (px)"
                                  type="number"
                                  value={formData.dimensions.height}
                                  onChange={(e) =>
                                    handleNestedChange(
                                      "dimensions",
                                      "height",
                                      Number(e.target.value)
                                    )
                                  }
                                  error={errors.dimensions}
                                  name="dimensions_height"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <Input
                                  label="Priority"
                                  type="number"
                                  value={formData.priority}
                                  onChange={(e) =>
                                    handleChange(
                                      "priority",
                                      Number(e.target.value)
                                    )
                                  }
                                  name="priority"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={formData.is_active}
                                    onChange={(e) =>
                                      handleChange(
                                        "is_active",
                                        e.target.checked
                                      )
                                    }
                                    name="is_active"
                                    className="text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                                  />
                                  <label className="text-sm text-gray-700 dark:text-gray-300">
                                    Active
                                  </label>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>

                        <Card className="shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <CardHeader
                            className="flex flex-row justify-between items-center cursor-pointer py-3"
                            onClick={() => toggleSection("content")}
                          >
                            <CardTitle className="text-base text-gray-900 dark:text-gray-100">
                              Content Settings
                            </CardTitle>
                            {expandedSections.content ? (
                              <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            )}
                          </CardHeader>
                          {expandedSections.content && (
                            <CardContent className="space-y-4 pt-4">
                              {(formData.ad_type === "banner" ||
                                formData.ad_type === "video") && (
                                <Select
                                  label="Content Type"
                                  options={
                                    contentTypeOptions[formData.ad_type] || []
                                  }
                                  value={formData.custom_content.content_type}
                                  onChange={(value) => {
                                    handleCustomContentChange(
                                      "content_type",
                                      value
                                    );
                                    handleCustomContentChange("image_url", "");
                                    handleCustomContentChange(
                                      "youtube_url",
                                      ""
                                    );
                                    handleChange("file", null);
                                  }}
                                  name="content_type"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                              )}
                              {formData.ad_type === "banner" &&
                                formData.custom_content.content_type ===
                                  "url" && (
                                  <Input
                                    label="Image URL"
                                    value={formData.custom_content.image_url}
                                    onChange={(e) =>
                                      handleCustomContentChange(
                                        "image_url",
                                        e.target.value
                                      )
                                    }
                                    error={errors.image_url}
                                    name="image_url"
                                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                  />
                                )}
                              {formData.ad_type === "banner" &&
                                formData.custom_content.content_type ===
                                  "custom_image" && (
                                  <>
                                    <FileUpload
                                      label="Upload Image"
                                      value={formData.file}
                                      onChange={handleFileChange}
                                      accept="image/*"
                                      preview={true}
                                      error={errors.file}
                                      name="file"
                                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                    />
                                    {formData.custom_content.image_url && (
                                      <Input
                                        label="Current Image URL"
                                        value={formData.custom_content.image_url}
                                        readOnly
                                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                      />
                                    )}
                                  </>
                                )}
                              {formData.ad_type === "video" &&
                                formData.custom_content.content_type ===
                                  "url" && (
                                  <Input
                                    label="YouTube URL"
                                    value={formData.custom_content.youtube_url}
                                    onChange={(e) =>
                                      handleCustomContentChange(
                                        "youtube_url",
                                        e.target.value
                                      )
                                    }
                                    error={errors.youtube_url}
                                    name="youtube_url"
                                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                  />
                                )}
                              {formData.ad_type === "video" &&
                                formData.custom_content.content_type ===
                                  "custom_video" && (
                                  <>
                                    <FileUpload
                                      label="Upload Video"
                                      value={formData.file}
                                      onChange={handleFileChange}
                                      accept="video/*"
                                      preview={true}
                                      error={errors.file}
                                      name="file"
                                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                    />
                                    {formData.custom_content.youtube_url && (
                                      <Input
                                        label="Current Video URL"
                                        value={
                                          formData.custom_content.youtube_url
                                        }
                                        readOnly
                                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                      />
                                    )}
                                  </>
                                )}
                              {formData.ad_type === "native" && (
                                <Textarea
                                  label="Native Ad Text"
                                  value={formData.custom_content.text}
                                  onChange={(e) =>
                                    handleCustomContentChange(
                                      "text",
                                      e.target.value
                                    )
                                  }
                                  error={errors.custom_content}
                                  name="text"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                              )}
                              {formData.ad_type === "custom" && (
                                <div className="space-y-4">
                                  <Textarea
                                    label="HTML"
                                    value={formData.custom_content.html}
                                    onChange={(e) =>
                                      handleCustomContentChange(
                                        "html",
                                        e.target.value
                                      )
                                    }
                                    error={errors.custom_content}
                                    name="html"
                                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 min-h-[100px]"
                                  />
                                  <Textarea
                                    label="CSS"
                                    value={formData.custom_content.css}
                                    onChange={(e) =>
                                      handleCustomContentChange(
                                        "css",
                                        e.target.value
                                      )
                                    }
                                    name="css"
                                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 min-h-[100px]"
                                  />
                                  <Textarea
                                    label="JS"
                                    value={formData.custom_content.js}
                                    onChange={(e) =>
                                      handleCustomContentChange(
                                        "js",
                                        e.target.value
                                      )
                                    }
                                    name="js"
                                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 min-h-[100px]"
                                  />
                                </div>
                              )}
                            </CardContent>
                          )}
                        </Card>

                        <Card className="shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <CardHeader
                            className="flex flex-row justify-between items-center cursor-pointer py-3"
                            onClick={() => toggleSection("targeting")}
                          >
                            <CardTitle className="text-base text-gray-900 dark:text-gray-100">
                              Targeting Settings
                            </CardTitle>
                            {expandedSections.targeting ? (
                              <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            )}
                          </CardHeader>
                          {expandedSections.targeting && (
                            <CardContent className="space-y-4 pt-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Select
                                  label="Page Match Type"
                                  value={formData.target_pages.match_type}
                                  options={matchTypeOptions}
                                  onChange={(val) =>
                                    handleNestedChange(
                                      "target_pages",
                                      "match_type",
                                      val
                                    )
                                  }
                                  name="match_type"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <Textarea
                                  label="Paths (comma separated)"
                                  value={formData.target_pages.paths.join(", ")}
                                  onChange={(e) =>
                                    handleNestedChange(
                                      "target_pages",
                                      "paths",
                                      e.target.value
                                        .split(",")
                                        .map((p) => p.trim())
                                        .filter((p) => p)
                                    )
                                  }
                                  error={errors.target_pages}
                                  name="paths"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <Select
                                  label="Devices"
                                  isMulti
                                  value={formData.target_audience.device}
                                  options={deviceOptions}
                                  onChange={(val) =>
                                    handleNestedChange(
                                      "target_audience",
                                      "device",
                                      val
                                    )
                                  }
                                  name="device"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <Select
                                  label="Age Range"
                                  isMulti
                                  value={formData.target_audience.age_range}
                                  options={ageRangeOptions}
                                  onChange={(val) =>
                                    handleNestedChange(
                                      "target_audience",
                                      "age_range",
                                      val
                                    )
                                  }
                                  name="age_range"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <Select
                                  label="Interests"
                                  isMulti
                                  value={formData.target_audience.interests}
                                  options={interestOptions}
                                  onChange={(val) =>
                                    handleNestedChange(
                                      "target_audience",
                                      "interests",
                                      val
                                    )
                                  }
                                  name="interests"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <Select
                                  label="Geo"
                                  isMulti
                                  value={formData.target_audience.geo}
                                  options={geoOptions}
                                  onChange={(val) =>
                                    handleNestedChange(
                                      "target_audience",
                                      "geo",
                                      val
                                    )
                                  }
                                  name="geo"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                              </div>
                            </CardContent>
                          )}
                        </Card>

                        <Card className="shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <CardHeader
                            className="flex flex-row justify-between items-center cursor-pointer py-3"
                            onClick={() => toggleSection("schedule")}
                          >
                            <CardTitle className="text-base text-gray-900 dark:text-gray-100">
                              Schedule Settings
                            </CardTitle>
                            {expandedSections.schedule ? (
                              <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            )}
                          </CardHeader>
                          {expandedSections.schedule && (
                            <CardContent className="space-y-4 pt-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <DateTimePicker
                                  label="Start Time"
                                  value={formData.schedule.start}
                                  onChange={(val) =>
                                    handleNestedChange("schedule", "start", val)
                                  }
                                  error={errors.schedule}
                                  name="start"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <DateTimePicker
                                  label="End Time"
                                  value={formData.schedule.end}
                                  onChange={(val) =>
                                    handleNestedChange("schedule", "end", val)
                                  }
                                  error={errors.schedule}
                                  name="end"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                                <Input
                                  label="Timezone"
                                  value={formData.schedule.timezone}
                                  onChange={(e) =>
                                    handleNestedChange(
                                      "schedule",
                                      "timezone",
                                      e.target.value
                                    )
                                  }
                                  name="timezone"
                                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                              </div>
                            </CardContent>
                          )}
                        </Card>

                        <div className="sticky bottom-0 bg-white dark:bg-gray-900 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setFormData(normalizeAdData(defaultAd))
                            }
                            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Reset
                          </Button>
                          <Button
                            type="button"
                            onClick={handleSaveAd}
                            variant="outline"
                            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {editingAd ? "Update Ad" : "Create Ad"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="col-span-1">
                    <Card className="shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 sticky top-4">
                      <CardHeader>
                        <CardTitle className="text-base text-gray-900 dark:text-gray-100">
                          Ad Preview
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Real-time preview of your ad configuration
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                          <AdPreview ad={formData} />
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              Type:
                            </span>
                            <span className="text-gray-800 dark:text-gray-100">
                              {formData.ad_type}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              Placement:
                            </span>
                            <span className="text-gray-800 dark:text-gray-100">
                              {formData.placement}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              Dimensions:
                            </span>
                            <span className="text-gray-800 dark:text-gray-100">
                              {formData.dimensions.width}x
                              {formData.dimensions.height}px
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              Status:
                            </span>
                            <span className="text-gray-800 dark:text-gray-100">
                              {formData.is_active ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>

      <Modal
        isOpen={!!previewAd}
        onClose={handleClosePreview}
        title="Ad Preview"
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 max-w-2xl"
      >
        <div className="space-y-4">
          <AdPreview ad={previewAd} />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Ad Name:</p>
              <p className="text-gray-800 dark:text-gray-100">
                {previewAd?.name}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Type:</p>
              <p className="text-gray-800 dark:text-gray-100">
                {previewAd?.ad_type}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Placement:</p>
              <p className="text-gray-800 dark:text-gray-100">
                {previewAd?.placement}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Status:</p>
              <p className="text-gray-800 dark:text-gray-100">
                {previewAd?.is_active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdSenseManagerView;